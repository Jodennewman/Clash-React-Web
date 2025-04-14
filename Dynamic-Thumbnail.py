#!/usr/bin/env python3
"""
Video Thumbnail Generator for 4K HEVC Videos

This script analyzes videos in a directory, finds the most dynamic frame in each video,
and saves it as a 720p webp screenshot in a sibling output directory.

Requirements:
- Python 3.6+
- FFmpeg
- OpenCV (cv2)
- numpy
- Pillow
- pytesseract
- face_recognition

Usage:
    python3 video_thumbnail_generator.py
    (Processes videos in current directory and subdirectories)
"""

import os
import sys
import subprocess
import shutil
import cv2
import numpy as np
from PIL import Image
import pytesseract
import face_recognition
import argparse

def ensure_directory(directory):
    """Create directory if it doesn't exist."""
    if not os.path.exists(directory):
        os.makedirs(directory)

def get_scene_changes(video_path, threshold=30, min_scene_length=10):
    """Detect scene changes in the video using FFmpeg."""
    cmd = [
        'ffmpeg', '-i', video_path, 
        '-vf', 'scale=1280:-1',  # Scale down to 720p equivalent for faster processing
        '-filter_complex', f'select=gt(scene\\,{threshold/100})',
        '-f', 'null', '-'
    ]
    
    try:
        result = subprocess.run(cmd, stderr=subprocess.PIPE, text=True)
        scenes = []
        for line in result.stderr.splitlines():
            if 'pts_time' in line:
                time_str = line.split('pts_time:')[1].split()[0]
                try:
                    time = float(time_str)
                    scenes.append(time)
                except ValueError:
                    pass
                    
        # Filter out scenes that are too close to each other
        if scenes:
            filtered_scenes = [scenes[0]]
            for scene in scenes[1:]:
                if scene - filtered_scenes[-1] >= min_scene_length:
                    filtered_scenes.append(scene)
            return filtered_scenes
        return []
    except Exception as e:
        print(f"Error detecting scenes: {e}")
        return []

def extract_frame(video_path, timestamp, output_path):
    """Extract a 720p frame at the given timestamp."""
    cmd = [
        'ffmpeg', '-ss', str(timestamp), '-i', video_path, 
        '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2',
        '-vframes', '1', '-q:v', '2', output_path
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error extracting frame: {e}")
        return False

def calculate_frame_metrics(image_path):
    """Calculate metrics to determine how dynamic a frame is."""
    image = cv2.imread(image_path)
    if image is None:
        return 0
    
    metrics = {
        'text_score': 0,
        'face_score': 0,
        'color_score': 0,
        'sharpness_score': 0,
        'motion_blur_score': 0
    }
    
    # Calculate text content score
    try:
        pil_image = Image.open(image_path)
        text = pytesseract.image_to_string(pil_image)
        metrics['text_score'] = len(text) * 0.5  # Weight for text content
    except Exception as e:
        print(f"Error with OCR: {e}")
    
    # Face detection
    try:
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(rgb_image)
        metrics['face_score'] = len(face_locations) * 30  # Weight for faces
    except Exception as e:
        print(f"Error with face detection: {e}")
    
    # Color variance (colorfulness)
    try:
        b, g, r = cv2.split(image)
        b_var = np.var(b.flatten())
        g_var = np.var(g.flatten())
        r_var = np.var(r.flatten())
        metrics['color_score'] = (b_var + g_var + r_var) / 3000  # Normalize
    except Exception as e:
        print(f"Error calculating color variance: {e}")
    
    # Image sharpness
    try:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        lap = cv2.Laplacian(gray, cv2.CV_64F)
        metrics['sharpness_score'] = np.var(lap) / 100  # Normalize
    except Exception as e:
        print(f"Error calculating sharpness: {e}")
    
    # Detect motion blur
    try:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 100, 200)
        metrics['motion_blur_score'] = np.mean(edges) / 2  # Normalize
    except Exception as e:
        print(f"Error calculating motion blur: {e}")
    
    # Calculate total score with weights
    total_score = (
        metrics['text_score'] * 0.4 +
        metrics['face_score'] * 0.3 +
        metrics['color_score'] * 0.1 +
        metrics['sharpness_score'] * 0.1 +
        metrics['motion_blur_score'] * 0.1
    )
    
    return total_score

def process_video(video_path, base_input_dir, output_dir):
    """Process a single video to find and save the most dynamic frame."""
    print(f"Processing: {video_path}")
    
    # Create output directory structure
    rel_path = os.path.relpath(video_path, base_input_dir)
    rel_dir = os.path.dirname(rel_path)
    output_path = os.path.join(output_dir, rel_dir)
    ensure_directory(output_path)
    
    # Get base filename and create webp filename
    base_name = os.path.basename(video_path)
    name_without_ext = os.path.splitext(base_name)[0]
    webp_name = f"{name_without_ext}.webp"
    final_output_path = os.path.join(output_path, webp_name)
    
    # Get video duration
    duration_cmd = [
        'ffprobe', '-v', 'error', '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1', video_path
    ]
    try:
        duration = float(subprocess.check_output(duration_cmd).decode('utf-8').strip())
    except:
        print(f"Error getting duration for {video_path}")
        return
    
    # Get scene changes
    scenes = get_scene_changes(video_path)
    
    # If no scene changes detected, sample frames at intervals
    if not scenes:
        # Sample 5 frames throughout the video
        scenes = [duration * i / 6 for i in range(1, 6)]
    
    # Create temp directory for frame analysis
    temp_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'temp_frames')
    ensure_directory(temp_dir)
    
    best_frame = None
    best_score = -1
    
    try:
        # Extract and analyze frames
        for i, timestamp in enumerate(scenes):
            temp_frame = os.path.join(temp_dir, f"frame_{i}.jpg")
            if extract_frame(video_path, timestamp, temp_frame):
                score = calculate_frame_metrics(temp_frame)
                print(f"  Frame at {timestamp:.2f}s - Score: {score:.2f}")
                
                if score > best_score:
                    best_score = score
                    best_frame = temp_frame
        
        # If we found a good frame, convert it to webp
        if best_frame:
            print(f"  Best frame found with score: {best_score:.2f}")
            cmd = [
                'ffmpeg', '-i', best_frame, 
                '-quality', '90', '-compression_level', '6',
                final_output_path
            ]
            subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            print(f"  Saved thumbnail to: {final_output_path}")
        else:
            print(f"  No suitable frame found for {video_path}")
    
    finally:
        # Clean up temp directory
        shutil.rmtree(temp_dir, ignore_errors=True)

def find_videos(directory):
    """Find all video files in a directory and its subdirectories."""
    video_extensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v', '.wmv']
    video_files = []
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if any(file.lower().endswith(ext) for ext in video_extensions):
                video_files.append(os.path.join(root, file))
    
    return video_files

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate thumbnails from the most dynamic frame in videos")
    parser.add_argument("--input-dir", help="Directory containing videos to process (default: current directory)")
    args = parser.parse_args()
    
    # Set input directory to current directory if not specified
    if not args.input_dir:
        args.input_dir = os.getcwd()
    
    # Get absolute path of input directory
    input_dir_abs = os.path.abspath(args.input_dir)
    
    # Create output directory as a sibling of input directory
    parent_dir = os.path.dirname(input_dir_abs)
    dir_name = os.path.basename(input_dir_abs) + "_thumbnails"
    output_dir = os.path.join(parent_dir, dir_name)
    
    # Ensure output directory exists
    ensure_directory(output_dir)
    
    # Check for required tools
    required_tools = ['ffmpeg', 'ffprobe']
    for tool in required_tools:
        if shutil.which(tool) is None:
            print(f"Error: {tool} is required but not found in PATH")
            sys.exit(1)
    
    # Find all videos
    video_files = find_videos(args.input_dir)
    
    if not video_files:
        print(f"No video files found in {args.input_dir}")
        sys.exit(0)
    
    print(f"Found {len(video_files)} video files to process")
    print(f"Input directory: {input_dir_abs}")
    print(f"Output directory: {output_dir}")
    
    # Process each video
    for video_file in video_files:
        process_video(video_file, input_dir_abs, output_dir)
    
    print(f"Processing complete. Thumbnails saved to {output_dir}")
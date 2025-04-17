- **Thumbnail Loading Fix – Execution Plan**

> This checklist refines the high‑level strategy we agreed on into small, verifiable steps.  We will tick each item as soon as it is completed and verified.

---

## 1 Register thumbnails at startup *(quick win)*

- [ ] 1.1 Import `registerThumbnails` from `src/utils/thumbnailMapper` in `src/main.tsx` (or the very first file executed by the app).
- [ ] 1.2 Invoke `registerThumbnails()` once on app boot.
- [ ] 1.3 Run the app and **confirm** the console prints `Course thumbnails registered with image mapper`.

## 2 Remove hard‑coded paths in components *(quick win)*

- [ ] 2.1 Locate every instance of manual thumbnail path construction (e.g. `/assets/main/DataBaseThumbnails/renamed/...`).
    - Components known so far: `ModuleHUD.tsx`, `ModuleHUDShowcase.tsx`, `course-viewer.tsx`, any modal helpers.
- [ ] 2.2 Replace each manual path with `courseUtils.getThumbnailPath(courseUtils.getModuleThumbnail(<moduleOrSectionId>))` (or the upcoming helper in §3).
- [ ] 2.3 Run ESLint & the app → verify thumbnails appear and no 404s occur.

## 3 Introduce `getModuleBlockThumbnail` helper *(structural)*

- [ ] 3.1 Add `getModuleBlockThumbnail(sectionId: string, moduleIndex: number)` to `course-utils.ts` as described in `module-thumbnail-optimization.md`.
- [ ] 3.2 Populate `/public/assets/main/ModuleThumbnails/small/` with placeholder images named `{sectionId}-{index}.webp` plus `default.webp`.
- [ ] 3.3 Refactor grid‑square thumbnail look‑ups in `ModuleHUD` to use this helper **instead of** `getThumbnailPath` directly.
- [ ] 3.4 Verify images load correctly and performance is acceptable.

## 4 Standardise & migrate existing thumbnails *(house‑keeping)*

- [ ] 4.1 Audit current images in `public/assets/main/DataBaseThumbnails/renamed/` and map them to the new naming scheme.
- [ ] 4.2 Create a script or perform manual renaming to fit the `{sectionId}-{moduleIndex}.webp` convention.
- [ ] 4.3 Update `sectionThumbnails` map inside `course-utils.ts` to reference real files (low‑res placeholders for now).

## 5 Ensure Vite includes all images in production *(build robustness)*

- [ ] 5.1 For dynamic backgrounds that still rely on `url('/assets/...')`, move those images to `/public` **or** import them so Vite fingerprints them (`import img from '...';`).
- [ ] 5.2 Run `npm run build` → open `dist` and confirm every referenced image exists and loads.

## 6 Final QA

- [ ] 6.1 Run the site in dev **and** production builds; navigate through ModuleHUD, modals, and CourseViewer to validate thumbnails everywhere.
- [ ] 6.2 Check console for missing‑asset warnings/404s.
- [ ] 6.3 Close this plan with a short retro once all check‑boxes are marked.

---

> While we execute, we'll update this file, placing an **x** inside the brackets ([x]) for each finished sub‑task. 
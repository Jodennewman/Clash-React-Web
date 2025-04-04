import React, { useEffect, useState } from 'react';
import { useTheme } from './ui/theme-provider';

export function ThemeTest() {
  const { theme, resolvedTheme } = useTheme();
  const [htmlClass, setHtmlClass] = useState<string>('');
  const [dataTheme, setDataTheme] = useState<string>('');
  const [cssVarBg, setCssVarBg] = useState<string>('');
  const [cssVarText, setCssVarText] = useState<string>('');

  useEffect(() => {
    // Function to check the current state of theme application
    const checkThemeState = () => {
      const html = document.documentElement;
      setHtmlClass(html.className);
      setDataTheme(html.getAttribute('data-theme') || 'none');
      setCssVarBg(getComputedStyle(html).getPropertyValue('--bg-cream'));
      setCssVarText(getComputedStyle(html).getPropertyValue('--text-navy'));
    };

    // Initial check
    checkThemeState();

    // Set up an interval to check periodically
    const interval = setInterval(checkThemeState, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-20 right-4 z-50 p-4 w-80 bg-white/90 dark:bg-black/90 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-2 text-black dark:text-white">Theme Debug</h3>
      <div className="space-y-2 text-xs">
        <p className="text-black dark:text-white">
          <span className="font-bold">Theme context:</span> {theme}
        </p>
        <p className="text-black dark:text-white">
          <span className="font-bold">Resolved theme:</span> {resolvedTheme}
        </p>
        <p className="text-black dark:text-white">
          <span className="font-bold">HTML class:</span> {htmlClass}
        </p>
        <p className="text-black dark:text-white">
          <span className="font-bold">data-theme:</span> {dataTheme}
        </p>
        <p className="text-black dark:text-white">
          <span className="font-bold">--bg-cream value:</span> {cssVarBg}
        </p>
        <p className="text-black dark:text-white">
          <span className="font-bold">--text-navy value:</span> {cssVarText}
        </p>
        <div className="mt-2">
          <div className="h-4 w-full bg-[--bg-cream] border border-gray-300" title="--bg-cream"></div>
          <div className="h-4 w-full bg-[--text-navy] mt-1 border border-gray-300" title="--text-navy"></div>
        </div>
      </div>
    </div>
  );
}

export default ThemeTest; 
import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ui/theme-provider';

interface CssVariable {
  name: string;
  value: string;
  category: string;
  isThemeAware: boolean;
}

const ThemeVisualizer: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [variables, setVariables] = useState<CssVariable[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    // Get all CSS variables from root
    const computedStyle = getComputedStyle(document.documentElement);
    const cssVars: CssVariable[] = [];
    
    // Extract all CSS variables and their computed values
    for (let i = 0; i < computedStyle.length; i++) {
      const prop = computedStyle[i];
      if (prop.startsWith('--')) {
        const value = computedStyle.getPropertyValue(prop).trim();
        const category = getCategoryFromVariable(prop);
        
        cssVars.push({
          name: prop,
          value: value,
          category: category,
          isThemeAware: prop.includes('--theme-')
        });
      }
    }
    
    setVariables(cssVars);
  }, [resolvedTheme]);

  // Determine category based on variable name patterns
  const getCategoryFromVariable = (name: string): string => {
    if (name.includes('-text-')) return 'text';
    if (name.includes('-bg-')) return 'background';
    if (name.includes('-primary') || name.includes('-accent') || name.includes('-coral') || 
        name.includes('-teal') || name.includes('-orange') || name.includes('-red')) return 'color';
    if (name.includes('-gradient')) return 'gradient';
    if (name.includes('-shadow')) return 'shadow';
    if (name.includes('-border')) return 'border';
    if (name.includes('-anim') || name.includes('-transition')) return 'animation';
    if (name.includes('-float')) return 'float';
    if (name.includes('-glow')) return 'glow';
    return 'other';
  };

  // Get filtered variables based on search term and category
  const getFilteredVariables = (): CssVariable[] => {
    return variables.filter(v => {
      const nameMatch = v.name.toLowerCase().includes(filter.toLowerCase());
      const categoryMatch = categoryFilter === 'all' || v.category === categoryFilter;
      return nameMatch && categoryMatch;
    });
  };

  // Check if a value appears to be a color
  const isColor = (value: string): boolean => {
    return value.startsWith('#') || 
           value.startsWith('rgb') || 
           value.startsWith('hsl') || 
           value.startsWith('oklch') ||
           value.startsWith('linear-gradient');
  };

  // Get variables that reference this variable
  const getReferencingVariables = (varName: string): CssVariable[] => {
    return variables.filter(v => 
      v.value.includes(varName) && v.name !== varName
    );
  };

  // Toggle the application theme
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="p-6 max-w-full bg-theme-bg-primary min-h-screen">
      <div className="sticky top-0 z-10 bg-theme-bg-primary pb-4 pt-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-theme-text-primary">
            Theme Variable Visualizer
          </h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-theme-primary text-theme-text-on-primary rounded-md shadow-theme-btn"
          >
            Toggle {resolvedTheme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Filter variables..."
            className="p-2 border border-theme-border rounded-md bg-theme-bg-surface text-theme-text-primary flex-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-theme-border rounded-md bg-theme-bg-surface text-theme-text-primary"
          >
            <option value="all">All Categories</option>
            <option value="text">Text</option>
            <option value="background">Background</option>
            <option value="color">Colors</option>
            <option value="gradient">Gradients</option>
            <option value="shadow">Shadows</option>
            <option value="border">Borders</option>
            <option value="animation">Animations</option>
            <option value="float">Float</option>
            <option value="glow">Glow</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="flex gap-2 text-xs overflow-x-auto pb-2">
          <div className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded-md">
            Theme-aware variables: {variables.filter(v => v.isThemeAware).length}
          </div>
          <div className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded-md">
            Base variables: {variables.filter(v => !v.isThemeAware).length}
          </div>
          <div className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 rounded-md">
            Total variables: {variables.length}
          </div>
          <div className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 rounded-md">
            Current theme: {resolvedTheme}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {getFilteredVariables().map((variable) => (
          <div 
            key={variable.name}
            className={`border rounded-lg p-4 ${
              variable.isThemeAware 
                ? 'border-green-300 bg-green-50/80 dark:bg-green-900/10 dark:border-green-800' 
                : 'border-gray-300 bg-gray-50/80 dark:bg-gray-800/30 dark:border-gray-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-mono text-sm font-semibold mb-2 text-theme-text-primary break-all">
                  {variable.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    variable.isThemeAware 
                      ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200' 
                      : 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200'
                  }`}>
                    {variable.isThemeAware ? 'theme-aware' : 'base'}
                  </span>
                  <span className="px-2 py-0.5 bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200 text-xs rounded-full">
                    {variable.category}
                  </span>
                </div>
              </div>
              
              {isColor(variable.value) && !variable.value.includes('var(') && (
                <div 
                  className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded shadow-sm"
                  style={{ background: variable.value }}
                  title={variable.value}
                />
              )}
            </div>
            
            <div className="font-mono text-xs mt-1 text-theme-text-secondary break-all">
              <code>{variable.value}</code>
            </div>
            
            {variable.value.includes('var(') && (
              <div className="mt-2 text-xs text-theme-text-tertiary">
                References: {variable.value.match(/var\(--(.*?)\)/g)?.join(', ')}
              </div>  
            )}
            
            {getReferencingVariables(variable.name).length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-theme-text-secondary font-medium">Referenced by:</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {getReferencingVariables(variable.name).map(ref => (
                    <span key={ref.name} className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                      {ref.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeVisualizer;
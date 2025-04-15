export interface ModuleData {
  id: string;
  title: string;
  subtitle?: string;
  color: string;
  founderMustWatch: boolean;
  featured: boolean;
  duration: number;
  thumbnail?: string;
  submodules?: Submodule[];
  success?: boolean;
  error?: boolean;
}

export interface SectionData {
  id: string;
  name: string;
  number: number;
  color: string;
  type: "bigSquare" | "normalSquare";
  size: "small" | "medium" | "large";
  featured?: boolean;
  displayKey?: string;
  modules: ModuleData[];
}

export interface Submodule {
  id: string;
  title: string;
  duration: number;
  completed?: boolean;
  description?: string;
  highValue?: boolean;
}

export interface Section {
  id: string;
  name: string;
  number: number;
  color: string;
  type: string;
  modules: ModuleData[];
} 
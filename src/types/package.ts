import { NpmPackageData } from './';

export interface PackageState {
  data?: NpmPackageData;
  error?: Error;
}

export interface InlineListSnippet {
  email?: string;
  label: string;
  url?: string;
}

export interface Config {
  verbose?: boolean;
  out: string;
  project: string;
  concurrency: number;
  depth: number;
  keyfile?: string;
  emulator?: string;
  collections?: string[];
  patterns?: string[];
}

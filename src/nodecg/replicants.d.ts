import { CurrentProgram } from './generated/current-program';
import { Programs, Program } from './generated/programs';

type Asset = {
  base: string;
  bundleName: string;
  category: string;
  ext: string;
  name: string;
  sum: string;
  url: string;
};

type Assets = Array<Asset>;

type ReplicantMap = {
  programs: Programs;
  'current-program': CurrentProgram;
  'assets:stands': Assets;
};

export { Program, Programs, CurrentProgram, Asset, Assets, ReplicantMap };

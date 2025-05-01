import { CurrentProgram } from './generated/current-program';
import { Programs, Program } from './generated/programs';
import { Timekeeping } from './generated/timekeeping';
import { EstPenalties } from './generated/est-penalties';
import { EstTimes } from './generated/est-times';

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
  timekeeping: Timekeeping;
  'est-penalties': EstPenalties;
  'est-times': EstTimes;
  'assets:stands': Assets;
};

export {
  Program,
  Programs,
  CurrentProgram,
  Timekeeping,
  EstPenalties,
  EstTimes,
  Asset,
  Assets,
  ReplicantMap,
};

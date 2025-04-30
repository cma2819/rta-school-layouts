import { Programs } from './generated/programs';

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
  'assets:stands': Assets;
};

export { Asset, Assets, ReplicantMap };

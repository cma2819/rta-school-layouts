import { ServerNodecgInstance } from '../nodecg/nodecg.js';
import estSurvival from './est-survival.js';
import programs from './programs.js';

export default (nodecg: ServerNodecgInstance) => {
  programs(nodecg);
  estSurvival(nodecg);
};

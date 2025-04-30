import { ServerNodecgInstance } from '../nodecg/nodecg.js';
import programs from './programs.js';

export default (nodecg: ServerNodecgInstance) => {
  programs(nodecg);
};

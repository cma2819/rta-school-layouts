import Browser from 'ts-nodecg/browser';
import Server from 'ts-nodecg/server';
import { ReplicantMap } from './replicants';
import { Configschema } from './generated/configschema';
import { MessageMap } from './messages';

export type ServerNodecgInstance = Server.CreateNodecgInstance<
  'rta-school-layouts',
  Configschema,
  ReplicantMap,
  MessageMap
>;

export type BrowserNodecgInstance = Browser.CreateNodecgInstance<
  'rta-school-layouts',
  Configschema,
  ReplicantMap,
  MessageMap
>;

export type BrowserNodecgConstructor = Browser.CreateNodecgConstructor<
  'rta-school-layouts',
  Configschema,
  ReplicantMap,
  MessageMap
>;

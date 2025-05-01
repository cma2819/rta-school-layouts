'use strict';

var livesplitCore = require('livesplit-core');
var got = require('got');
var neverthrow = require('neverthrow');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var got__default = /*#__PURE__*/_interopDefault(got);

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
const _Time = class _Time {
  constructor(rawInSecond) {
    __publicField$1(this, "display");
    __publicField$1(this, "rawInSecond");
    this.rawInSecond = rawInSecond;
    const hours = Math.floor(rawInSecond / 3600);
    const minutes = Math.floor(rawInSecond % 3600 / 60);
    const seconds = Math.floor(rawInSecond % 60);
    const display = (hours > 0 ? hours.toString().padStart(2, "0") + ":" : "") + `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    this.display = display;
  }
};
__publicField$1(_Time, "make", (seconds) => {
  return new _Time(seconds);
});
let Time = _Time;

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
const TimerPhase = {
  notRunning: 0,
  running: 1,
  paused: 3
};
class Timekeeper {
  constructor(initialSeconds) {
    __publicField(this, "livesplit");
    const run = livesplitCore.Run.new();
    run.pushSegment(livesplitCore.Segment.new("Finish"));
    const timer = livesplitCore.Timer.new(run);
    if (!timer) {
      throw new Error("Failed to create livesplit timer!");
    }
    timer.setLoadingTimes(livesplitCore.TimeSpan.fromSeconds(0));
    if (initialSeconds && initialSeconds > 0) {
      this.initExistsTime(timer, initialSeconds);
    }
    timer.initializeGameTime();
    this.livesplit = timer;
  }
  start() {
    const phase = this.livesplit.currentPhase();
    this.livesplit.start();
    this.livesplit.pause();
    this.livesplit.setGameTime(livesplitCore.TimeSpan.fromSeconds(0));
    this.livesplit.resume();
    if (phase !== TimerPhase.notRunning) {
      throw new Error(
        "This would be nothing happened. You need to reset to start timer."
      );
    }
  }
  pause() {
    const phase = this.livesplit.currentPhase();
    this.livesplit.pause();
    if (phase !== TimerPhase.running) {
      throw new Error(
        "This would be nothing happened. You can pause timer only when it's running."
      );
    }
    return this.currentTime;
  }
  resume() {
    const phase = this.livesplit.currentPhase();
    this.livesplit.resume();
    if (phase !== TimerPhase.paused) {
      throw new Error(
        "This would be nothing happened. You can resume timer only when it's paused."
      );
    }
  }
  finish() {
    this.livesplit.split();
    const time = this.currentTime;
    return time;
  }
  reset() {
    this.livesplit.reset(false);
  }
  initExistsTime(timer, initSeconds) {
    timer.start();
    timer.pause();
    timer.setGameTime(livesplitCore.TimeSpan.fromSeconds(initSeconds));
    return timer;
  }
  get status() {
    switch (this.livesplit.currentPhase()) {
      case TimerPhase.paused:
        return "paused";
      case TimerPhase.running:
        return "in_progress";
      default:
        return "finished";
    }
  }
  get currentTime() {
    const totalSeconds = this.currentTimeSeconds;
    return Time.make(totalSeconds);
  }
  get currentTimeSeconds() {
    return this.livesplit.currentTime().gameTime()?.totalSeconds() || 0;
  }
}

const estSurvival = (nodecg) => {
  const tickRateMs = 100;
  const timekeepingRep = nodecg.Replicant("timekeeping", {
    defaultValue: {
      time: {
        display: "00:00",
        rawInSecond: 0
      },
      status: "finished"
    }
  });
  const penaltyRep = nodecg.Replicant("est-penalties", {
    defaultValue: 0
  });
  const estTimesRep = nodecg.Replicant("est-times", {
    defaultValue: {
      display: "00:00",
      rawInSecond: 0
    }
  });
  const currentRunRep = nodecg.Replicant("runDataActiveRun", "nodecg-speedcontrol");
  const timekeeper = new Timekeeper(timekeepingRep.value.time.rawInSecond);
  if (timekeepingRep.value.status === "in_progress") {
    timekeeper.resume();
  }
  const tick = () => {
    const time = timekeeper.currentTime;
    const status = timekeeper.status;
    if (penaltyRep.value !== void 0 && currentRunRep.value?.estimateS) {
      const totalTime = currentRunRep.value.estimateS;
      const penaltyTime = penaltyRep.value * 60;
      const totalTimeWithPenalty = totalTime - penaltyTime;
      const currentTime = Time.make(
        Math.max(totalTimeWithPenalty - time.rawInSecond, 0)
      );
      estTimesRep.value = {
        display: currentTime.display,
        rawInSecond: currentTime.rawInSecond
      };
      if (currentTime.rawInSecond <= 0) {
        nodecg.sendMessage("est:over");
      }
    }
    timekeepingRep.value = { time, status };
  };
  setInterval(tick, tickRateMs);
  nodecg.listenFor("est:start", (_, cb) => {
    if (!cb || cb.handled) {
      return;
    }
    try {
      timekeeper.start();
    } catch (e) {
      if (cb && e instanceof Error) {
        cb(e);
      }
    }
    cb(null);
  });
  nodecg.listenFor("est:pause", (_, cb) => {
    if (!cb || cb.handled) {
      return;
    }
    try {
      timekeeper.pause();
      cb(null);
    } catch (e) {
      if (cb && e instanceof Error) {
        cb(e);
      }
    }
  });
  nodecg.listenFor("est:resume", (_, cb) => {
    if (!cb || cb.handled) {
      return;
    }
    try {
      timekeeper.resume();
    } catch (e) {
      if (cb && e instanceof Error) {
        cb(e);
      }
    }
    cb(null);
  });
  nodecg.listenFor("est:finish", (_, cb) => {
    if (!cb || cb.handled) {
      return;
    }
    try {
      timekeeper.finish();
      cb(null);
    } catch (e) {
      if (cb && e instanceof Error) {
        cb(e);
      }
    }
  });
  nodecg.listenFor("est:reset", (_, cb) => {
    if (!cb || cb.handled) {
      return;
    }
    try {
      timekeeper.reset();
      cb(null);
    } catch (e) {
      if (cb && e instanceof Error) {
        cb(e);
      }
    }
  });
  nodecg.listenFor("est:plus", (_, cb) => {
    if (!cb || cb.handled) {
      return;
    }
    penaltyRep.value += 1;
    cb(null);
  });
  nodecg.listenFor("est:minus", (_, cb) => {
    if (!cb || cb.handled) {
      return;
    }
    penaltyRep.value -= 1;
    cb(null);
  });
};

const BASE_URL = "https://horaro.org/-/api/v1";
async function fetchScheduleByIdOrSlug(event, idOrSlug) {
  const url = `${BASE_URL}/events/${event}/schedules/${idOrSlug}`;
  return got__default.default(url).json();
}

const defaultProgram = {
  name: "",
  estimate: "0:00:00",
  estimateInSeconds: 0
};
const horaroUrlToSlugs = (url) => {
  const match = url.match(/horaro\.org\/([^/]+)\/([^/]+)/);
  if (!match) {
    return null;
  }
  return {
    event: match[1],
    slug: match[2]
  };
};
const fetchColumns = async (url) => {
  const slugs = horaroUrlToSlugs(url);
  if (!slugs) {
    return neverthrow.err("Invalid URL");
  }
  const { event, slug } = slugs;
  const schedule = await fetchScheduleByIdOrSlug(event, slug);
  return neverthrow.ok(schedule.data.columns);
};
const fetchScheduleItems = async (url, columns) => {
  const slugs = horaroUrlToSlugs(url);
  if (!slugs) {
    return neverthrow.err("Invalid URL");
  }
  const { event, slug } = slugs;
  const schedule = await fetchScheduleByIdOrSlug(event, slug);
  if (columns.title >= schedule.data.columns.length) {
    return neverthrow.err("Invalid column index");
  }
  const items = schedule.data.items.map((item) => ({
    name: item.data[columns.title],
    estimateInSeconds: item.length_t
  }));
  return neverthrow.ok(items);
};
const secondsToTimePresentation = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const secs = seconds % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
const programs = (nodecg) => {
  const logger = new nodecg.Logger("programs");
  const programsRep = nodecg.Replicant("programs", {
    defaultValue: []
  });
  nodecg.Replicant("current-program", {
    defaultValue: defaultProgram
  });
  nodecg.listenFor("programs:getColumns", async ({ url }, cb) => {
    if (!cb || cb?.handled) {
      return;
    }
    const columns = await fetchColumns(url);
    if (columns.isErr()) {
      logger.error(`Failed to fetch columns: ${columns.error}`);
      return cb(columns.error);
    }
    logger.info(`Fetched columns: ${columns.value}`);
    return cb(null, { columns: columns.value });
  });
  nodecg.listenFor("programs:loadSchedule", async ({ url, columns }, cb) => {
    if (!cb || cb?.handled) {
      return;
    }
    const items = await fetchScheduleItems(url, columns);
    if (items.isErr()) {
      logger.error(`Failed to fetch schedule items: ${items.error}`);
      return cb(items.error);
    }
    programsRep.value = items.value.map((item) => ({
      ...item,
      estimate: secondsToTimePresentation(item.estimateInSeconds)
    }));
    return cb(null);
  });
};

var index = (nodecg) => {
  programs(nodecg);
  estSurvival(nodecg);
};

module.exports = index;
//# sourceMappingURL=index.js.map

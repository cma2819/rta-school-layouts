'use strict';

var got = require('got');
var neverthrow = require('neverthrow');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var got__default = /*#__PURE__*/_interopDefault(got);

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
};

module.exports = index;
//# sourceMappingURL=index.js.map

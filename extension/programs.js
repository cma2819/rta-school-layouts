import { fetchScheduleByIdOrSlug } from './lib/horaro.js';
import { err, ok } from 'neverthrow';
const horaroUrlToSlugs = (url) => {
    const match = url.match(/horaro\.org\/([^/]+)\/([^/]+)/);
    if (!match) {
        return null;
    }
    return {
        event: match[1],
        slug: match[2],
    };
};
const fetchColumns = async (url) => {
    const slugs = horaroUrlToSlugs(url);
    if (!slugs) {
        return err('Invalid URL');
    }
    const { event, slug } = slugs;
    const schedule = await fetchScheduleByIdOrSlug(event, slug);
    return ok(schedule.columns);
};
const fetchScheduleItems = async (url, columns) => {
    const slugs = horaroUrlToSlugs(url);
    if (!slugs) {
        return err('Invalid URL');
    }
    const { event, slug } = slugs;
    const schedule = await fetchScheduleByIdOrSlug(event, slug);
    if (columns.title >= schedule.columns.length) {
        return err('Invalid column index');
    }
    const items = schedule.items.map(item => ({
        name: item.data[columns.title],
        estimateInSeconds: item.length_t,
    }));
    return ok(items);
};
const secondsToTimePresentation = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
};
const programs = (nodecg) => {
    const logger = new nodecg.Logger('programs');
    const programsRep = nodecg.Replicant('programs', {
        defaultValue: [],
    });
    nodecg.listenFor('programs:getColumns', async ({ url }, cb) => {
        if (!cb || cb?.handled) {
            return;
        }
        const columns = await fetchColumns(url);
        if (columns.isErr()) {
            logger.error(`Failed to fetch columns: ${columns.error}`);
            return cb(columns.error);
        }
        return cb(null, { columns: columns.value });
    });
    nodecg.listenFor('programs:loadSchedule', async ({ url, columns }, cb) => {
        if (!cb || cb?.handled) {
            return;
        }
        const items = await fetchScheduleItems(url, columns);
        if (items.isErr()) {
            logger.error(`Failed to fetch schedule items: ${items.error}`);
            return cb(items.error);
        }
        programsRep.value = items.value.map(item => ({
            ...item,
            estimate: secondsToTimePresentation(item.estimateInSeconds),
        }));
        return cb(null);
    });
};
export default programs;

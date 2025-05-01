import NodeCG from 'nodecg/types';
import { ServerNodecgInstance } from '../nodecg/nodecg';
import { Timekeeper } from './lib/Timekeeper';
import { RunDataActiveRun } from '../nodecg/externals/speedcontrol';
import { Time } from './lib/Time';

const estSurvival = (nodecg: ServerNodecgInstance) => {
  const tickRateMs = 100;

  const timekeepingRep = nodecg.Replicant('timekeeping', {
    defaultValue: {
      time: {
        display: '00:00',
        rawInSecond: 0,
      },
      status: 'finished',
    },
  });
  const penaltyRep = nodecg.Replicant('est-penalties', {
    defaultValue: 0,
  });
  const estTimesRep = nodecg.Replicant('est-times', {
    defaultValue: {
      display: '00:00',
      rawInSecond: 0,
    },
  });
  const currentRunRep = (
    nodecg as unknown as NodeCG.ServerAPI
  ).Replicant<RunDataActiveRun>('runDataActiveRun', 'nodecg-speedcontrol');

  const timekeeper = new Timekeeper(timekeepingRep.value.time.rawInSecond);
  if (timekeepingRep.value.status === 'in_progress') {
    timekeeper.resume();
  }

  const tick = () => {
    const time = timekeeper.currentTime;
    const status = timekeeper.status;

    if (penaltyRep.value !== undefined && currentRunRep.value?.estimateS) {
      const totalTime = currentRunRep.value.estimateS;
      const penaltyTime = penaltyRep.value * 60;
      const totalTimeWithPenalty = totalTime - penaltyTime;
      const currentTime = Time.make(
        Math.max(totalTimeWithPenalty - time.rawInSecond, 0),
      );

      estTimesRep.value = {
        display: currentTime.display,
        rawInSecond: currentTime.rawInSecond,
      };

      if (currentTime.rawInSecond <= 0) {
        nodecg.sendMessage('est:over');
      }
    }

    timekeepingRep.value = { time, status };
  };

  setInterval(tick, tickRateMs);

  nodecg.listenFor('est:start', (_, cb) => {
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

  nodecg.listenFor('est:pause', (_, cb) => {
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

  nodecg.listenFor('est:resume', (_, cb) => {
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

  nodecg.listenFor('est:finish', (_, cb) => {
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

  nodecg.listenFor('est:reset', (_, cb) => {
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

  nodecg.listenFor('est:plus', (_, cb) => {
    if (!cb || cb.handled) {
      return;
    }

    penaltyRep.value += 1;
    cb(null);
  });

  nodecg.listenFor('est:minus', (_, cb) => {
    if (!cb || cb.handled) {
      return;
    }

    penaltyRep.value -= 1;
    cb(null);
  });
};

export default estSurvival;

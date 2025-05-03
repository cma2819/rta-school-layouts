import { useListenFor, useReplicant } from '@nodecg/react-hooks';
import React, { useEffect } from 'react';
import { EstTimes } from '../../../../nodecg/replicants';

export const ObsSceneControl = () => {
  const [waitToGameOver, setWaitToGameOver] = React.useState<boolean>(false);
  const [estTimes] = useReplicant<EstTimes>('est-times');

  useListenFor('est:start', () => {
    setWaitToGameOver(true);
  });

  useEffect(() => {
    if (waitToGameOver && estTimes?.rawInSecond === 0) {
      window.obsstudio.setCurrentScene('est-setup');
      setWaitToGameOver(false);
    }
  }, [estTimes?.rawInSecond]);

  return <></>;
};

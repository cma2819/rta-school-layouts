import React from 'react';
import { useReplicant } from '@nodecg/react-hooks';
import {
  RunDataActiveRun,
  Timer,
} from '../../../../nodecg/externals/speedcontrol';
import styled from '@emotion/styled';
import { StrongText, Text } from '../../ui/texts';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
`;

const DoneTimerText = styled(StrongText)`
  color: #cccc00;
`;

const GameText = styled(StrongText)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const RunInfo = () => {
  const [activeRun] = useReplicant<RunDataActiveRun>('runDataActiveRun', {
    bundle: 'nodecg-speedcontrol',
  });
  const [timer] = useReplicant<Timer>('timer', {
    bundle: 'nodecg-speedcontrol',
  });

  const runnerNames = activeRun?.teams
    .flatMap(team => team.players)
    .map(player => player.name);

  const TimerText = timer?.state === 'finished' ? DoneTimerText : StrongText;

  return (
    <Container>
      <GameText
        style={{
          gridRow: '1 / 2',
          gridColumn: '1 / 2',
        }}
      >
        {activeRun?.game?.split(' ').map((word, index) => (
          <span key={index} style={{ margin: '0 4px' }}>
            {word}
          </span>
        ))}
      </GameText>
      <Text style={{ gridRow: '2 / 3', gridColumn: '1 / 2' }}>
        {activeRun?.category} - {activeRun?.estimate}
      </Text>
      <StrongText style={{ gridRow: '1 / 2', gridColumn: '2 / 3' }}>
        <Text style={{ display: 'inline-block', marginRight: '8px' }}>r=</Text>
        {runnerNames?.join(' / ')}
      </StrongText>
      <TimerText style={{ gridRow: '2 / 3', gridColumn: ' 2 / 3' }}>
        <Text style={{ display: 'inline-block', marginRight: '8px' }}>t=</Text>
        {timer?.time}
      </TimerText>
    </Container>
  );
};

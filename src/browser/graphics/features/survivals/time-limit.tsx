import React from 'react';
import styled from '@emotion/styled';
import { GiantText, Text } from '../../ui/texts';
import { useReplicant } from '@nodecg/react-hooks';
import { EstPenalties, EstTimes } from '../../../../nodecg/replicants';

const Continer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr 24px auto 1fr;
  grid-gap: 24px;
  justify-items: start;
  align-items: center;
`;

export const TimeLimit = () => {
  const [penalty] = useReplicant<EstPenalties>('est-penalties');
  const [time] = useReplicant<EstTimes>('est-times');

  return (
    <Continer>
      <Text>外来語・無言</Text>
      <GiantText>{penalty}</GiantText>
      <div></div>
      <Text>残り時間</Text>
      <GiantText>{time?.display}</GiantText>
    </Continer>
  );
};

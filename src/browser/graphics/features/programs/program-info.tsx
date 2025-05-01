import React from 'react';
import { useReplicant } from '@nodecg/react-hooks';
import { CurrentProgram } from '../../../../nodecg/replicants';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: 48px;
`;

export const ProgramInfo = () => {
  const [currentProgram] = useReplicant<CurrentProgram>('current-program');

  return (
    <Container>
      <Text>{currentProgram?.name}</Text>
    </Container>
  );
};

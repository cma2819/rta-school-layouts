import React from 'react';
import { render } from '../../render';
import { BackgroundBoard } from '../features/background/background-board';
import styled from '@emotion/styled';
import '../styles.css';
import { ProgramInfo } from '../features/programs/program-info';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
`;

const InfoArea = styled.div`
  position: absolute;
  top: 64px;
  left: 16px;
  width: 1680px;
`;

const App = () => {
  return (
    <Container>
      <BackgroundBoard />
      <InfoArea>
        <ProgramInfo />
      </InfoArea>
    </Container>
  );
};

render(<App />);

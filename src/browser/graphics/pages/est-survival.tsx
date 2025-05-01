import React from 'react';
import { render } from '../../render';
import { BackgroundBoard } from '../features/background/background-board';
import styled from '@emotion/styled';
import { RunInfo } from '../features/speedruns/run-info';
import '../styles.css';
import { TimeLimit } from '../features/survivals/time-limit';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
`;

const InfoArea = styled.div`
  position: absolute;
  bottom: 64px;
  left: 264px;
  height: 128px;
  width: 1380px;
`;

const VideoArea = styled.div`
  position: absolute;
  top: 16px;
  left: 64px;
  width: 1458px;
  height: 820px;
`;

const TimeLimitArea = styled.div`
  position: absolute;
  bottom: 256px;
  right: 158px;
  width: 378px;
  height: 360px;
`;

const App = () => {
  return (
    <Container>
      <BackgroundBoard />
      <VideoArea />
      <InfoArea>
        <RunInfo />
      </InfoArea>
      <TimeLimitArea>
        <TimeLimit />
      </TimeLimitArea>
    </Container>
  );
};

render(<App />);

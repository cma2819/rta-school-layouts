import React from 'react';
import { render } from '../../render';
import { BackgroundBoard } from '../features/background/background-board';
import styled from '@emotion/styled';
import '../styles.css';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
`;

const App = () => {
  return (
    <Container>
      <BackgroundBoard />
    </Container>
  );
};

render(<App />);

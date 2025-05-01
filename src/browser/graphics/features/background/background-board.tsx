import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useReplicant } from '@nodecg/react-hooks';
import { Assets } from '../../../../nodecg/replicants';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 8px 1fr 8px;
  grid-template-rows: 8px 1fr 8px 16px;
`;

const Border = styled.div`
  background-color: #654321;
`;

const Board = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  background-color: #004400;
`;

const BoardBase = styled.div`
  background-color: #654321;
  grid-row: 4 / 5;
  grid-column: 1 / 4;
`;

const RightInfoGrid = styled.div`
  position: absolute;
  top: 64px;
  right: 24px;
  display: grid;
  grid-template-rows: repeat(8, 64px);
  justify-items: center;
  font-size: 48px;
`;

const Duties = styled.div`
  writing-mode: vertical-rl;
  margin-top: 36px;
`;

const LogoArea = styled.div`
  position: absolute;
  bottom: 32px;
  left: 16px;
  width: 240px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const startOfDayTwo = new Date(2025, 4, 5, 0, 0, 0);

export const BackgroundBoard = () => {
  const [isDayTwo, setIsDayTwo] = React.useState(false);
  const [logos] = useReplicant<Assets>('assets:logo');
  const [logoPath, setLogoPath] = React.useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setIsDayTwo(startOfDayTwo.getTime() <= now.getTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (logos && logos.length > 0) {
      const logo = logos[0];
      setLogoPath(logo.url);
    }
  }, [logos]);

  return (
    <Container>
      <Border style={{ gridColumn: '1 / 4', gridRow: '1 / 2' }} />
      <Border style={{ gridColumn: '1 / 2', gridRow: '2 / 3' }} />
      <Border style={{ gridColumn: '3 / 4', gridRow: '2 / 3' }} />
      <Border style={{ gridColumn: '1 / 4', gridRow: '3 / 4' }} />
      <Board />
      <BoardBase />
      <RightInfoGrid>
        <div>五</div>
        <div>月</div>
        <div></div>
        <div>{isDayTwo ? '五' : '四'}</div>
        <div>日</div>
        <div></div>
        <div>(木)</div>
        <div></div>
        <div>日直</div>
        <Duties>
          とよ
          <br />
          おふじ
        </Duties>
      </RightInfoGrid>
      <LogoArea>
        {logoPath && (
          <img
            src={logoPath}
            alt="Logo"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        )}
      </LogoArea>
    </Container>
  );
};

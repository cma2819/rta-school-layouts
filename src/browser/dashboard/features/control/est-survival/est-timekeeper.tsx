import React from 'react';
import { Button, ButtonProps, Grid, TextField, Tooltip } from '@mui/material';
import { useReplicant } from '@nodecg/react-hooks';
import { EstTimes, Timekeeping } from '../../../../../nodecg/replicants';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DoneIcon from '@mui/icons-material/Done';
import FastRewindIcon from '@mui/icons-material/FastRewind';

type ButtonBaseProps = { help?: string } & ButtonProps;

const ButtonBase = ({ help, ...props }: ButtonBaseProps) => {
  return (
    <Tooltip title={help} placement="top">
      <Button variant="contained" {...props} fullWidth />
    </Tooltip>
  );
};

type ControlButtonProps = Pick<ButtonBaseProps, 'onClick' | 'disabled'>;

const StartButton = (props: ControlButtonProps) => {
  return (
    <ButtonBase color="inherit" {...props} help="スタート/再開">
      <PlayArrowIcon />
    </ButtonBase>
  );
};

const PauseButton = (props: ControlButtonProps) => {
  return (
    <ButtonBase color="inherit" {...props} help="一時停止">
      <PauseIcon />
    </ButtonBase>
  );
};

const FinishButton = (props: ControlButtonProps) => {
  return (
    <ButtonBase color="inherit" {...props} help="完走">
      <DoneIcon />
    </ButtonBase>
  );
};

const ResetButton = (props: ControlButtonProps) => {
  return (
    <ButtonBase color="inherit" {...props} help="リセット">
      <FastRewindIcon />
    </ButtonBase>
  );
};

export const EstTimekeeper = () => {
  const [time] = useReplicant<EstTimes>('est-times');
  const [timekeeping] = useReplicant<Timekeeping>('timekeeping');

  const timerState = React.useMemo(() => {
    return timekeeping?.status ?? 'in_progress';
  }, [timekeeping?.status]);

  const displayTime = React.useMemo(() => {
    if (!time) {
      return '';
    }
    return time.display;
  }, [time?.display]);

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Tooltip
          title="残り時間はRTAのestimateをもとに計算します"
          placement="top"
        >
          <TextField
            fullWidth
            label="残り時間"
            variant="outlined"
            value={displayTime}
            sx={{ fontSize: '3rem' }}
            slotProps={{
              input: {
                inputProps: {
                  style: {
                    textAlign: 'center',
                    padding: '4px 8px',
                  },
                },
                readOnly: true,
                style: {
                  fontSize: '2rem',
                },
              },
            }}
          />
        </Tooltip>
      </Grid>
      <Grid size={3}>
        <StartButton
          disabled={timerState === 'in_progress'}
          onClick={() => {
            if (timerState === 'paused' || timerState === 'finished') {
              nodecg.sendMessage('est:resume');
              return;
            }
            nodecg.sendMessage('est:start');
          }}
        />
      </Grid>
      <Grid size={3}>
        <PauseButton
          disabled={timerState !== 'in_progress'}
          onClick={() => {
            nodecg.sendMessage('est:pause');
          }}
        />
      </Grid>
      <Grid size={3}>
        <FinishButton
          disabled={timerState === 'finished' || timerState === 'not_running'}
          onClick={() => {
            nodecg.sendMessage('est:finish');
          }}
        />
      </Grid>
      <Grid size={3}>
        <ResetButton
          onClick={() => {
            nodecg.sendMessage('est:reset');
          }}
        />
      </Grid>
    </Grid>
  );
};

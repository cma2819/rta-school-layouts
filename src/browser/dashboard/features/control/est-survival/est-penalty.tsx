import React from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';
import { useReplicant } from '@nodecg/react-hooks';
import { EstPenalties } from '../../../../../nodecg/replicants';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const EstPenalty = () => {
  const [penalty] = useReplicant<EstPenalties>('est-penalties');

  const presentPenalty = penalty !== undefined ? penalty : 0;

  return (
    <Stack spacing={1}>
      <ButtonGroup variant="contained" fullWidth color="inherit">
        <Button
          onClick={() => {
            nodecg.sendMessage('est:minus');
          }}
        >
          <RemoveIcon />
        </Button>
        <Button disableRipple disableTouchRipple>
          {presentPenalty}
        </Button>
        <Button
          onClick={() => {
            nodecg.sendMessage('est:plus');
          }}
        >
          <AddIcon />
        </Button>
      </ButtonGroup>
      <Button
        fullWidth
        variant="contained"
        color="inherit"
        onClick={() => {
          nodecg.sendMessage('est:reset');
        }}
      >
        ペナルティリセット
      </Button>
    </Stack>
  );
};

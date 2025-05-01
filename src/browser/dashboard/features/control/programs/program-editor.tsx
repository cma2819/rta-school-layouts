import React, { useEffect, useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { useReplicant } from '@nodecg/react-hooks';
import { CurrentProgram } from '../../../../../nodecg/replicants';

export const isTimeFormatText = (timeString: string): boolean => {
  const timeFormatRegex = /^\d{1,}:\d{2}:\d{2}$/;
  return timeFormatRegex.test(timeString);
};

export const calcSecondsFromText = (timeString: string): number | null => {
  if (!isTimeFormatText(timeString)) {
    return null;
  }

  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

export const ProgramEditor = () => {
  const [currentProgram, setCurrentProgram] =
    useReplicant<CurrentProgram>('current-program');
  const [programName, setProgramName] = useState('');
  const [estimate, setEstimate] = useState('');

  useEffect(() => {
    if (currentProgram) {
      setProgramName(currentProgram.name);
      setEstimate(currentProgram.estimate);
    }
  }, [currentProgram]);

  const canSave = isTimeFormatText(estimate);

  const handleSaveCurrent = () => {
    if (!canSave) {
      return;
    }
    setCurrentProgram({
      name: programName,
      estimate: estimate,
      estimateInSeconds: calcSecondsFromText(estimate) ?? 0,
    });
  };

  return (
    <Stack spacing={2} component="form">
      <TextField
        label="企画名"
        value={programName}
        onChange={e => setProgramName(e.target.value)}
        fullWidth
      />
      <TextField
        label="予定タイム (h:mm:ss)"
        value={estimate}
        onChange={e => setEstimate(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        disabled={!canSave}
        onClick={handleSaveCurrent}
      >
        保存
      </Button>
    </Stack>
  );
};

import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from '@mui/material';
import { useReplicant } from '@nodecg/react-hooks';
import { Programs, CurrentProgram } from '../../../../../nodecg/replicants';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const ColumnSwitcher = () => {
  const [programs] = useReplicant<Programs>('programs');
  const [selectedProgram, setSelectedProgram] = React.useState<number>(0);
  const [, setCurrentProgram] = useReplicant<CurrentProgram>('current-program');

  const handleApplyProgram = () => {
    if (programs && selectedProgram >= 0 && selectedProgram < programs.length) {
      setCurrentProgram(programs[selectedProgram]);
    }
  };

  return (
    <Stack spacing={2}>
      <FormControl fullWidth>
        <InputLabel>企画選択</InputLabel>
        <Select
          value={selectedProgram}
          onChange={e => setSelectedProgram(Number(e.target.value))}
        >
          {programs &&
            programs.map((p, pIndex) => (
              <MenuItem key={pIndex} value={pIndex}>
                {p.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button
        startIcon={<ArrowDownwardIcon />}
        variant="contained"
        fullWidth
        onClick={handleApplyProgram}
      >
        反映
      </Button>
    </Stack>
  );
};

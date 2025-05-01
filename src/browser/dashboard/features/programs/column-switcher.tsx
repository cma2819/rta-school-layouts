import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useReplicant } from '@nodecg/react-hooks';
import { Programs } from '../../../../nodecg/replicants';

export const ColumnSwitcher = () => {
  const [programs, setPrograms] = useReplicant<Programs>('programs');

  return (
    <FormControl fullWidth>
      <InputLabel>企画選択</InputLabel>
      <Select>
        {programs &&
          programs.map((p, pIndex) => (
            <MenuItem value={pIndex}>{p.name}</MenuItem>
          ))}
      </Select>
    </FormControl>
    <Button></Button>
  );
};

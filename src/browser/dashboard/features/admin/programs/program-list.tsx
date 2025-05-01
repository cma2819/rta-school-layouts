import React from 'react';
import { useReplicant } from '@nodecg/react-hooks';
import { Programs } from '../../../../../nodecg/replicants';
import { List, ListItem, ListItemText, Paper } from '@mui/material';

export const ProgramList = () => {
  const [programs] = useReplicant<Programs>('programs');

  return (
    <List component={Paper}>
      {programs?.map((program, index) => (
        <ListItem key={index}>
          <ListItemText primary={program.name} secondary={program.estimate} />
        </ListItem>
      ))}
    </List>
  );
};

import React, { useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { ColumnLoader } from './column-loader';
import { ProgramLoader } from './program-loader';

export const LoadPrograms = () => {
  const [url, setUrl] = React.useState<string>('');
  const [columns, setColumns] = React.useState<string[]>([]);

  useEffect(() => {
    const defaultUrl = nodecg.bundleConfig.programs.horaro;
    if (defaultUrl) {
      setUrl(defaultUrl);
    }
  }, [nodecg]);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextField
          label="Horaro URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </Grid>
      <Grid size={12}>
        <ColumnLoader
          url={url}
          onColumnLoaded={columns => setColumns(columns)}
        />
      </Grid>
      <Grid size={12}>
        <ProgramLoader url={url} columns={columns} />
      </Grid>
    </Grid>
  );
};

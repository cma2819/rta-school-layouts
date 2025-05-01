import React, { useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { ColumnLoader } from './column-loader';
import { ProgramLoader } from './program-loader';
import { ProgramList } from './program-list';

export const LoadPrograms = () => {
  const [url, setUrl] = React.useState<string>('');
  const [columns, setColumns] = React.useState<string[]>([]);
  const [isDirty, setIsDirty] = React.useState(false);

  useEffect(() => {
    const defaultUrl = nodecg.bundleConfig.programs.horaro;
    if (defaultUrl) {
      setUrl(defaultUrl);
    }
  }, [nodecg]);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value;
    setUrl(newUrl);
    setIsDirty(true);
  };

  const handleColumnLoaded = (columns: string[]) => {
    setColumns(columns);
    setIsDirty(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextField
          label="Horaro URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={handleUrlChange}
        />
      </Grid>
      <Grid size={12}>
        <ColumnLoader url={url} onColumnLoaded={handleColumnLoaded} />
      </Grid>
      <Grid size={12}>
        <ProgramLoader url={url} columns={columns} preventControl={isDirty} />
      </Grid>
      <Grid size={12}>
        <ProgramList />
      </Grid>
    </Grid>
  );
};

import React from 'react';
import { Button } from '@mui/material';

type Props = {
  url: string;
  onColumnLoaded?: (columns: string[]) => void;
};

export const ColumnLoader = ({ url, onColumnLoaded }: Props) => {
  const canLoad = url.length > 0;

  const loadColumns = () => {
    nodecg.sendMessage('programs:getColumns', { url }, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      onColumnLoaded?.(result.columns);
    });
  };
  return (
    <Button
      variant="contained"
      disabled={!canLoad}
      fullWidth
      onClick={loadColumns}
    >
      読み込み列選択
    </Button>
  );
};

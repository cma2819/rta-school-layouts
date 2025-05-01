import React from 'react';
import { Button } from '@mui/material';

type Props = {
  url: string;
  onColumnLoaded?: (columns: string[]) => void;
};

export const ColumnLoader = ({ url, onColumnLoaded }: Props) => {
  const canLoad = url.length > 0;
  const [isLoading, setIsLoading] = React.useState(false);

  const loadColumns = () => {
    setIsLoading(true);
    nodecg.sendMessage('programs:getColumns', { url }, (err, result) => {
      if (err) {
        console.error(err);
        setIsLoading(false);
        return;
      }
      onColumnLoaded?.(result.columns);
      setIsLoading(false);
    });
  };
  return (
    <Button
      variant="contained"
      disabled={!canLoad}
      fullWidth
      onClick={loadColumns}
      loading={isLoading}
    >
      読み込み列選択
    </Button>
  );
};

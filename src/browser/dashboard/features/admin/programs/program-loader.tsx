import React from 'react';
import {
  Button,
  Stack,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';

type Props = {
  url: string;
  columns: string[];
  preventControl?: boolean;
};

export const ProgramLoader = ({ url, columns, preventControl }: Props) => {
  const [selectedColumn, setSelectedColumn] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setSelectedColumn(0);
  }, [columns]);

  const loadPrograms = () => {
    if (selectedColumn === undefined) {
      return;
    }
    setIsLoading(true);
    nodecg.sendMessage(
      'programs:loadSchedule',
      { url, columns: { title: selectedColumn } },
      err => {
        if (err) {
          console.error(err);
        }
        setIsLoading(false);
        return;
      },
    );
  };

  return (
    <Stack>
      {columns.length > 0 && (
        <>
          <RadioGroup
            row
            value={selectedColumn}
            onChange={e => setSelectedColumn(Number(e.target.value))}
          >
            {columns.map((column, index) => (
              <FormControlLabel
                key={`column_${index}`}
                control={<Radio />}
                label={column}
                value={index}
                disabled={preventControl}
              />
            ))}
          </RadioGroup>
          <Button
            variant="contained"
            onClick={loadPrograms}
            disabled={selectedColumn === undefined || preventControl}
            loading={isLoading}
          >
            企画一覧を読み込み
          </Button>
        </>
      )}
    </Stack>
  );
};

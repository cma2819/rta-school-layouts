import React from 'react';
import { Stack, Checkbox, FormControlLabel } from '@mui/material';

type Props = {
  columns: string[];
  onChange?: (columns: string[]) => void;
};

export const ColumnSelector = ({ columns, onChange }: Props) => {
  const [selectedColumns, setSelectedColumns] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSelectedColumns([]);
  }, [columns]);

  const handleColumnChange = (column: string) => {
    setSelectedColumns(prev =>
      prev.includes(column)
        ? prev.filter(c => c !== column)
        : [...prev, column],
    );
  };

  return (
    <Stack spacing={2} direction="column">
      {columns.map(column => (
        <FormControlLabel
          key={column}
          control={
            <Checkbox
              checked={selectedColumns.includes(column)}
              onChange={() => handleColumnChange(column)}
            />
          }
          label={column}
        />
      ))}
    </Stack>
  );
};

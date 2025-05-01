import React from 'react';
import { render } from '../../render';
import { LoadPrograms } from '../features/programs/load-programs';
import { DashboardThemeProvider } from '../dashboard-theme-provider';
import { Stack } from '@mui/material';
import { ColumnSwitcher } from '../features/programs/column-switcher';

const App = () => {
  return (
    <div>
      <DashboardThemeProvider>
        <Stack sx={{ minHeight: '480px' }}>
          <ColumnSwitcher />
        </Stack>
      </DashboardThemeProvider>
    </div>
  );
};

render(<App />);

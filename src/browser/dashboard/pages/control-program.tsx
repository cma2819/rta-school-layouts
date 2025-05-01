import React from 'react';
import { render } from '../../render';
import { DashboardThemeProvider } from '../dashboard-theme-provider';
import { Stack } from '@mui/material';
import { ColumnSwitcher } from '../features/control/programs/column-switcher';
import { ProgramEditor } from '../features/control/programs/program-editor';

const App = () => {
  return (
    <div>
      <DashboardThemeProvider>
        <Stack spacing={2} sx={{ minHeight: '480px' }}>
          <ColumnSwitcher />
          <ProgramEditor />
        </Stack>
      </DashboardThemeProvider>
    </div>
  );
};

render(<App />);

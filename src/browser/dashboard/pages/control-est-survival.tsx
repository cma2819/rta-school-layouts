import React from 'react';
import { render } from '../../render';
import { DashboardThemeProvider } from '../dashboard-theme-provider';
import { Stack } from '@mui/material';
import { EstTimekeeper } from '../features/control/est-survival/est-timekeeper';
import { EstPenalty } from '../features/control/est-survival/est-penalty';

const App = () => {
  return (
    <div>
      <DashboardThemeProvider>
        <Stack spacing={2}>
          <EstTimekeeper />
          <EstPenalty />
        </Stack>
      </DashboardThemeProvider>
    </div>
  );
};

render(<App />);

import React from 'react';
import { render } from '../../render';
import { LoadPrograms } from '../features/programs/load-programs';
import { DashboardThemeProvider } from '../dashboard-theme-provider';

const App = () => {
  return (
    <div>
      <DashboardThemeProvider>
        <LoadPrograms />
      </DashboardThemeProvider>
    </div>
  );
};

render(<App />);

import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import BasicCalculator from './BasicCalculator';
import ComplexCalculator from './ComplexCalculator';
import MatrixCalculator from './MatrixCalculator';
import TrigCalculator from './TrigCalculator';
import CalculusCalculator from './CalculusCalculator';
import SeriesCalculator from './SeriesCalculator';
import VectorCalculator from './VectorCalculator';

const CalculatorTabs: React.FC = () => {
  const [tab, setTab] = useState(0);
  const tabLabels = ['Basic', 'Complex', 'Matrix', 'Trig', 'Calculus', 'Series', 'Vectors'];

  return (
    <Box sx={{ display: 'flex', minHeight: 400 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tab}
        onChange={(_, val) => setTab(val)}
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: 150 }}
      >
        {tabLabels.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {tab === 0 && <BasicCalculator />}
        {tab === 1 && <ComplexCalculator />}
        {tab === 2 && <MatrixCalculator />}
        {tab === 3 && <TrigCalculator />}
        {tab === 4 && <CalculusCalculator />}
        {tab === 5 && <SeriesCalculator />}
        {tab === 6 && <VectorCalculator />}
      </Box>
    </Box>
  );
};

export default CalculatorTabs;

import React from 'react';

import { createRoot } from 'react-dom/client';

import Figure1 from './jsx/Figure1.jsx';
import Figure2 from './jsx/Figure2.jsx';

const containerFig1 = document.getElementById('app-root-2022-interest_rates_figure1');
const rootFig1 = createRoot(containerFig1);
rootFig1.render(<Figure1 />);

const containerFig2 = document.getElementById('app-root-2022-interest_rates_figure2');
const rootFig2 = createRoot(containerFig2);
rootFig2.render(<Figure2 />);

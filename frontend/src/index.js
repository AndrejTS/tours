import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import Tours from './components/Tours';

function App() {
  return <Tours />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

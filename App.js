import React from 'react';
import ReactDOM from 'react-dom/client';

const jsxHeading = (
  <div id='parent'>
    <div id='child'>
      <h1 id='heading'>Hello World inside Child😀</h1>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(jsxHeading);

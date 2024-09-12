import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const err = useRouteError();
  return (
    <div>
      <h1>{err.status + err.statusText}</h1>
      <h3>{'OOPs!!! Page not found'}</h3>
    </div>
  );
};

export default Error;

import React, { useState, useEffect } from 'react';

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = () => {
    window.addEventListener('online', () => setOnlineStatus(true));
    window.addEventListener('offline', () => setOnlineStatus(false));
  };

  return onlineStatus;
};

export default useOnlineStatus;

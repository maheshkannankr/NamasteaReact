import react, { useEffect, useState } from 'react';
import { RESTMENU_URL } from '../constants';

const useRestaruntMenu = (restID) => {
  const [restInfo, setRestInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const restData = await fetch(RESTMENU_URL + restID);

    const parsedData = await restData.json();

    setRestInfo(parsedData.data);
  };

  return restInfo;
};

export default useRestaruntMenu;

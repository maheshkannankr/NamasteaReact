import { useState } from 'react';
import { restList } from '../utils/mockData';
import RestCard from './RestCard';
import Button from './Button';

const Body = () => {
  const [{ listOfRestarunts }, setState] = useState({
    listOfRestarunts: restList,
  });

  const onClickFilterButton = () => {
    let filteredRest = listOfRestarunts.filter((res) => {
      return res.avgRating > 4;
    });
    setState((prevState) => ({
      ...prevState,
      listOfRestarunts: filteredRest,
    }));
  };
  const onClickClearFilterButton = () => {
    setState((prevState) => ({
      ...prevState,
      listOfRestarunts: restList,
    }));
  };

  return (
    <div className='body'>
      <div className='b_search_container'></div>
      <Button label={'Filter Top Restarunts'} onClick={onClickFilterButton} />
      <Button label={'Clear Filter'} onClick={onClickClearFilterButton} />
      <div className='b_restcard_container'>
        {listOfRestarunts.map(
          ({
            name,
            avgRating,
            cloudinaryImageId,
            areaName,
            cuisines,
            costForTwo,
          }) => {
            return (
              <RestCard
                src={cloudinaryImageId}
                restName={name}
                rating={avgRating}
                cuisine={cuisines.join(',')}
                locality={areaName}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default Body;

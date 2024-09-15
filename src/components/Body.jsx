import { useState, useEffect } from 'react';
import { restList } from '../utils/mockData';
import RestCard from './RestCard';
import Button from './Button';
import ShimmerUI from './ShimmerUI';
import { Link } from 'react-router-dom';

const Body = () => {
  const [listOfRestarunts, setListOfRestarunts] = useState([]);
  const [filteredRest, setFilteredRest] = useState([]);
  const [restSearchText, setRestSearchText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0066625&lng=80.2206369&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    );

    const restList = await data.json();
    const listOfRest = restList?.data?.cards?.filter((card) => {
      return card.card.card.id === 'restaurant_grid_listing';
    })[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setListOfRestarunts(listOfRest);
    setFilteredRest(listOfRest);
  };

  const onClickFilterButton = () => {
    let filteredRest = listOfRestarunts.filter((res) => {
      return res.info.avgRating >= 4.5;
    });
    setFilteredRest(filteredRest);
  };
  const onClickClearFilterButton = () => {
    setRestSearchText('');
    setFilteredRest(listOfRestarunts);
  };

  const onChangeSearchText = (searchValue) => {
    setRestSearchText(searchValue);
  };

  const onClickSearchButton = () => {
    const filteredRest = listOfRestarunts.filter((rest) => {
      return rest.info.name
        .toLowerCase()
        .includes(restSearchText.toLowerCase());
    });
    setRestSearchText('');
    setFilteredRest(filteredRest);
  };

  return (
    <div className='body'>
      <div className='b_search_container'>
        <input
          className='search_field'
          value={restSearchText}
          onChange={(e) => onChangeSearchText(e.target.value)}
        />
        <Button label={'Search Restarunt'} onClick={onClickSearchButton} />
        <Button label={'Filter Top Restarunts'} onClick={onClickFilterButton} />
        <Button label={'Clear Filter'} onClick={onClickClearFilterButton} />
      </div>

      {!listOfRestarunts.length ? (
        <ShimmerUI />
      ) : (
        <div className='b_restcard_container'>
          {filteredRest.map((card) => {
            return (
              <Link
                key={card.info.id}
                to={'/city/chennai/' + card.info.id}
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <RestCard
                  src={card.info.cloudinaryImageId}
                  restName={card.info.name}
                  rating={card.info.avgRating}
                  cuisine={card.info.cuisines.join(',')}
                  locality={card.info.areaName}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Body;

import React, { useEffect, useState } from 'react';
import './restaruntmenu.css';
import ShimmerUI from '../ShimmerUI';
import { RatingStar, DeliveryCycle, TitleDeco } from '../../../assets/svgs';
import GreyDot from '../greyDot/GreyDot';
import HrDividerLine from '../hrLine/HrDividerLine';

const RestDetails = ({ ...props }) => {
  const renderRatingNPriceView = () => {
    return (
      <div className='rm_rd_rating_container flex'>
        <div className='rm_rd_rating_view flex p03gap'>
          <RatingStar />
          <h4 className='font_sb'>{`${props.avgRating} ( ${props.totalRatingsString} )`}</h4>
        </div>
        <GreyDot />
        <label className='font_r'>{`₹ ${
          props.costForTwo / 100
        } for two`}</label>
      </div>
    );
  };

  const renderCuisinesView = () => {
    return (
      <div className={'rm_rd_cuisines_container'}>
        <label className='font_sb rm_rd_cuisines_text'>
          {props.cuisines.join(', ')}
        </label>
      </div>
    );
  };

  const renderOutletTravelTimeView = () => {
    return (
      <div className='rm_rd_delivery_time_container'>
        <table>
          <tbody>
            <tr className='rm_rd_delivery_time_row_container flex p1gap'>
              <td>
                <GreyDot />
              </td>
              <td className='flex p06gap'>
                <label className='font_b'>{'Outlet'}</label>
                <label className='font_r'>{props.areaName}</label>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr className='rm_rd_delivery_time_row_container flex p1gap'>
              <td>
                <GreyDot />
              </td>
              <td className='flex p06gap'>
                <label className='font_b'>{`${props.sla.minDeliveryTime} - ${props.sla.maxDeliveryTime} mins`}</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderDistanceFeesContainer = () => {
    return (
      <div className='rm_rd_distance_container p1gap flex'>
        <DeliveryCycle />
        <label className='font_r'>{`${props.sla.lastMileTravel} ${
          props.sla.lastMileTravel === 1 ? 'km' : 'kms'
        } | ₹${
          props.feeDetails.totalFee / 100
        } Delivery fee will apply`}</label>
      </div>
    );
  };
  return (
    <div className='rm_rd_main_container p07gap flex'>
      {renderRatingNPriceView()}
      {renderCuisinesView()}
      {renderOutletTravelTimeView()}
      <HrDividerLine />
      {renderDistanceFeesContainer()}
    </div>
  );
};

const RestaruntMenu = () => {
  const [restInfo, setRestInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const restData = await fetch(
      'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.0066625&lng=80.2206369&restaurantId=668737&catalog_qa=undefined&submitAction=ENTER'
    );

    const parsedData = await restData.json();
    console.log('====================================');
    console.log(parsedData.data.cards[2]?.card?.card?.info);
    console.log('====================================');
    setRestInfo(parsedData.data);
  };

  if (restInfo === null) return <ShimmerUI />;
  const {
    sla,
    name,
    cuisines,
    areaName,
    locality,
    avgRating,
    costForTwo,
    feeDetails,
    lastMileTravel,
    cloudinaryImageId,
    totalRatingsString,
  } = restInfo?.cards[2]?.card?.card?.info;
  return (
    <div className='restaruntmenu_container flex p1gap'>
      <h1 className='font_sb'>{name}</h1>
      <div className='rm_rest_detail_gradient_container'>
        <RestDetails
          sla={sla}
          cuisines={cuisines}
          areaName={areaName}
          avgRating={avgRating}
          feeDetails={feeDetails}
          costForTwo={costForTwo}
          lastMileTravel={lastMileTravel}
          totalRatingsString={totalRatingsString}
        />
      </div>
      <div className='rm_menu_title_container p05gap flex'>
        <TitleDeco />
        <span className='font_r'>{'MENU'}</span>
        <TitleDeco />
      </div>
    </div>
  );
};

export default RestaruntMenu;

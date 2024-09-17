import React, { useEffect, useState } from 'react';
import './restaruntmenu.css';
import ShimmerUI from '../ShimmerUI';
import {
  RatingStar,
  DeliveryCycle,
  TitleDeco,
  VegIcon,
  NonVegIcon,
  DownArrow,
} from '../../../assets/svgs';
import GreyDot from '../greyDot/GreyDot';
import HrDividerLine from '../hrLine/HrDividerLine';
import { CDN_URL, FOOD_CATEGORY } from '../../utils/constants';
import { useParams } from 'react-router-dom';
import useRestaruntMenu from '../../utils/hooks/useRestaruntMenu';

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

const RestItemCard = ({ ...props }) => {
  const { name, price, imageId, ratings, itemAttribute, description } =
    props.item.card.info;

  const getColorFromValue = (value) => {
    // Ensure value is between 1 and 5
    value = Math.max(1, Math.min(5, value));

    // Convert value from 1-5 to 0-1 scale
    const greenValue = (value - 1) / 4; // Range from 0 (for red) to 1 (for green)

    // Generate RGB color. Red decreases as value increases, green increases.
    const r = Math.round(255 * (1 - greenValue)); // Red decreases as value increases
    const g = Math.round(255 * greenValue); // Green increases as value increases
    const b = 0; // Keeping blue constant (no blue)

    return `rgb(${r}, ${g}, ${b})`;
  };

  const itemCategoryIcon = () => {
    return itemAttribute?.vegClassifier === FOOD_CATEGORY[0] ? (
      <VegIcon />
    ) : (
      <NonVegIcon />
    );
  };

  return (
    <div className='rm_ri_main_container flex'>
      <div className='rm_ri_detail_container'>
        {itemCategoryIcon()}
        <h5 className='font_sb'>{name}</h5>
        <h5 className='font_sb'>{`₹ ${(price / 100).toFixed(2)}`}</h5>
        {ratings?.aggregatedRating?.rating && (
          <>
            <label
              className='rm_ri_rating_text_style font_r'
              style={{
                color: getColorFromValue(ratings.aggregatedRating.rating),
              }}
            >
              {`${
                ratings?.aggregatedRating?.rating
                  ? ratings.aggregatedRating.rating
                  : ''
              }`}{' '}
            </label>
            <label className='rm_ri_rating_text_style font_r'>{`( ${ratings.aggregatedRating.ratingCountV2} )`}</label>
          </>
        )}
        <p className='rm_ri_rating_text_style font_r'>{description}</p>
      </div>
      {imageId && <img className='rm_ri_img_style' src={CDN_URL + imageId} />}
    </div>
  );
};

const CategoryCollapsableCard = ({ ...props }) => {
  const { itemCards, title } = props.card.card.card;

  const onClickCollapsableMenu = (index) => {
    if (props.onClickCollapsableMenu) {
      props.onClickCollapsableMenu(index);
    }
  };

  const arrowClassName = props.openState
    ? 'rm_ri_collapsable_heading_arrow open'
    : 'rm_ri_collapsable_heading_arrow';

  const containerClassName = props.openState
    ? 'rm_ri_collapsable_container flex p1gap'
    : 'rm_ri_collapsable_container open flex p1gap';

  return (
    <div className={containerClassName}>
      <div
        className='rm_ri_collapsable_heading_container flex'
        onClick={() => onClickCollapsableMenu(props.index)}
      >
        <h4 className='font_b'>{title}</h4>
        <div className={arrowClassName}>
          <DownArrow />
        </div>
      </div>
      {props.openState && (
        <div className='rm_ri_collapsable_item_container p1gap flex'>
          {itemCards.map((item, index) => {
            return <RestItemCard item={item} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

const RestaruntMenu = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const { restId } = useParams();

  const restInfo = useRestaruntMenu(restId);

  const onClickCollapsableMenu = (index) => {
    setOpenIndex(index);
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

  const { cards } = restInfo?.cards[4].groupedCard.cardGroupMap.REGULAR;
  let restItemsCardsList = cards.filter((item) => {
    return item.card.card.hasOwnProperty('itemCards');
  });

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
      {restItemsCardsList?.map((item, index) => {
        return openIndex === index ? (
          <CategoryCollapsableCard
            card={item}
            key={index}
            index={index}
            openState={true}
            onClickCollapsableMenu={onClickCollapsableMenu}
          />
        ) : (
          <CategoryCollapsableCard
            card={item}
            key={index}
            index={index}
            openState={false}
            onClickCollapsableMenu={onClickCollapsableMenu}
          />
        );
      })}
    </div>
  );
};

export default RestaruntMenu;

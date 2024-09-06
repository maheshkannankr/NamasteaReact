import { CDN_URL } from '../utils/constants';
import { RatingStar } from '../../assets/svgs';

const RestCard = ({ ...props }) => {
  return (
    <div className='rest_card_layout'>
      <img className='restCard_img_style' src={CDN_URL + props.src} />
      <div className='restCard_detailsContainer'>
        <h6 className='restCard_restName_text'>{props.restName}</h6>
        <div className='restCard_ratingContainer'>
          <RatingStar />
          <label className='restCard_rating_text'>{props.rating}</label>
        </div>
        <label className='restCard_cuisine_text'>{props.cuisine}</label>
        <label className='restCard_rating_text'>{props.locality}</label>
      </div>
    </div>
  );
};

export default RestCard;

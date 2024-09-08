const dummyCards = [];

for (let i = 0; i < 15; i++) {
  dummyCards.push(<div className='shimmer_card_layout' key={i}></div>);
}

const ShimmerUI = () => {
  return <div className='b_shimmer_container'>{dummyCards}</div>;
};

export default ShimmerUI;

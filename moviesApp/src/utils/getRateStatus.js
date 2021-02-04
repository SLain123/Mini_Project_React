const getRateStatus = (currentId, movieRateList) => {
  let resultRate = 0;

  movieRateList.forEach(({ id, rating }) => {
    if (id === currentId) {
      resultRate = rating;
    }
  });

  return resultRate;
};

export default getRateStatus;

import { format } from 'date-fns';

const cutsOverview = (text, beforeNum) => {
    if (text.length < beforeNum) {
        return text;
    }
    let resultText = text.substring(0, beforeNum - 3);
    const wordIndex = resultText.lastIndexOf(' ');

    resultText = resultText.substring(0, wordIndex);

    return `${resultText}...`;
};

const getRateStatus = (currentId, movieRateList) => {
    let resultRate = 0;

    movieRateList.forEach(({ id, rating }) => {
        if (id === currentId) {
            resultRate = rating;
        }
    });

    return resultRate;
};

const getRightDataFormat = (date) => {
    if (date === '') {
        return 'Release date unknown';
    }
    return format(new Date(date), 'LLLL d, yyyy');
};

export { cutsOverview, getRateStatus, getRightDataFormat };

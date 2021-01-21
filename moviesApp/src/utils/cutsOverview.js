const cutsOverview = (text, beforeNum) => {
  if (text.length < beforeNum) {
    return text;
  }
  let resultText = text.substring(0, beforeNum - 3);
  const wordIndex = resultText.lastIndexOf(" ");

  resultText = resultText.substring(0, wordIndex);

  return `${resultText}...`;
};

export default cutsOverview;

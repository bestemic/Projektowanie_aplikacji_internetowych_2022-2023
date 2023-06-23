const getAnswerLabel = (index) => {
    let label = '';
    let quotient = Math.floor(index / 26);
    let remainder = index % 26;

    if (quotient > 0) {
        label += String.fromCharCode(65 + quotient - 1);
    }
    label += String.fromCharCode(65 + remainder);

    return label;
};

export default getAnswerLabel;
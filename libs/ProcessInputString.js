function getBotSignal(signalString) {
    const arrayInput = signalString.split('||');
    const id = arrayInput[0];
    const name = arrayInput[1];
    const enterPrice = arrayInput[2];
    const isCall = arrayInput[3] === 'CALL';
    return { id, name, enterPrice, isCall, isHighProbability: false, countDownTimer: 299 };
}

function getResultFromString(result) {

}

module.exports = { getResultFromString, getBotSignal };

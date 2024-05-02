const generateRandomInt = (min: number = 0, max: number = 999999999) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default generateRandomInt;

/*
 * Calcurate the length of the given string.
 * Full-width characters are counted as 2, and half-width characters are counted as 1.
 */
export const countTextLength = (str: string): number =>
	str
		.split("")
		.reduce((acc, cur): number => acc + (isFullWidthChar(cur) ? 2 : 1), 0);

export const isFullWidthChar = (char: string): boolean => {
	const halfWidthRegExp = /[\x01-\x7E\u{FF65}-\u{FF9F}]/mu;
	return !halfWidthRegExp.test(char);
};

export const padEndFullWidthChar = (
	str: string,
	length: number,
	padStr: string,
): string => {
	const charLength = countTextLength(str);
	console.log(length, charLength);
	return str + padStr.repeat(length - charLength);
};

export const padCenterFullWidthChar = (
	str: string,
	length: number,
	padStr: string,
): string => {
	const charLength = countTextLength(str);
	const padLength = length - charLength;
	const padLeft = Math.floor(padLength / 2);
	const padRight = padLength - padLeft;
	return padStr.repeat(padLeft) + str + padStr.repeat(padRight);
};

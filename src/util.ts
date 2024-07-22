/*
 * Calcurate the length of the given string.
 * Full-width characters are counted as 2, and half-width characters are counted as 1.
 */
export const countTextLength = (str: string): number =>
	str
		.split("")
		.reduce((acc, cur): number => acc + (isFullWidthChar(cur) ? 2 : 1), 0);

export const isFullWidthChar = (char: string): boolean => {
	const codePoint = char.codePointAt(0);
	if (codePoint === undefined) return false;

	return (
		(codePoint >= 0xff01 && codePoint <= 0xff60) ||
		(codePoint >= 0xffe0 && codePoint <= 0xffe6) ||
		(codePoint >= 0x3000 && codePoint <= 0x303f) || // ZENKAKU PUNCTUATION
		(codePoint >= 0x3040 && codePoint <= 0x309f) || // HIRAGANA
		(codePoint >= 0x30a0 && codePoint <= 0x30ff) || // KATAKANA
		(codePoint >= 0x4e00 && codePoint <= 0x9fff) || // KANJI
		(codePoint >= 0xac00 && codePoint <= 0xd7af) // HANGUL
	);
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

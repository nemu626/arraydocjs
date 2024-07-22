import { BorderChar, DefaultDocumentStyle } from "./constant";
import type {
	ArrayDocument,
	DocumentStyle,
	Segment,
	SegmentPosition,
} from "./type";
import { countTextLength, padCenterFullWidthChar } from "./util";

export const array2String = (array: string[], style: DocumentStyle): string => {
	const { lineStyle = "normal", paddingSpace = 1 } = style;
	const resultLines = [
		//draw top line
		drawCharLine(
			BorderChar.leftTop[lineStyle],
			BorderChar.horizontal[lineStyle],
			paddingSpace,
			array.map((s) =>
				BorderChar.horizontal[lineStyle].repeat(countTextLength(s)),
			),
			BorderChar.topT[lineStyle],
			BorderChar.rightTop[lineStyle],
		),
		//character line
		drawCharLine(
			BorderChar.vertical[lineStyle],
			" ",
			paddingSpace,
			array,
			BorderChar.vertical[lineStyle],
			BorderChar.vertical[lineStyle],
		),
		//draw bottom line
		drawCharLine(
			BorderChar.leftBottom[lineStyle],
			BorderChar.horizontal[lineStyle],
			paddingSpace,
			array.map((s) =>
				BorderChar.horizontal[lineStyle].repeat(countTextLength(s)),
			),
			BorderChar.bottomT[lineStyle],
			BorderChar.rightBottom[lineStyle],
		),
	];
	return resultLines.join("\n");
};

export const drawCharLine = (
	start: string,
	pad: string,
	padLength: number,
	contents: string[],
	interBorder: string,
	end: string,
): string => {
	const padString = pad.repeat(padLength);
	const result =
		start +
		contents
			.map(
				(c, i) =>
					`${padString}${c}${padString}${i !== contents.length - 1 ? interBorder : ""}`,
			)
			.join("") +
		end;
	return result;
};

export const drawSegment = (
	segment: Segment,
	position: SegmentPosition,
	cellLength: number,
	arrayLength: number,
): string => {
	const { startIndex, endIndex, content, lineStyle = "bold" } = segment;

	const fullLineLength = arrayLength * cellLength + (cellLength + 1);
	const startPos = (cellLength + 1) * startIndex;
	const endPos = (endIndex + 1) * (cellLength + 1);
	const centerPointPos = Math.floor((endPos + startPos) / 2);

	const contentRow =
		" ".repeat(centerPointPos - Math.floor(countTextLength(content) / 2)) +
		content +
		" ".repeat(Math.max(fullLineLength - endPos, 0));

	const startChar =
		position === "top"
			? BorderChar.leftTop[lineStyle]
			: BorderChar.leftBottom[lineStyle];
	const endChar =
		position === "top"
			? BorderChar.rightTop[lineStyle]
			: BorderChar.rightBottom[lineStyle];
	const contentPointChar =
		position === "top"
			? BorderChar.bottomT[lineStyle]
			: BorderChar.topT[lineStyle];
	const borderChar = BorderChar.horizontal[lineStyle];

	const segmentRow =
		" ".repeat(startPos) +
		startChar +
		borderChar.repeat(centerPointPos - startPos - 1) +
		contentPointChar +
		borderChar.repeat(endPos - centerPointPos - 1) +
		endChar;

	return position === "top"
		? `${contentRow}\n${segmentRow}`
		: `${segmentRow}\n${contentRow}`;
};

export const array2Doc = <T>(document: ArrayDocument<T>): string => {
	const accessor = document.accessor ?? ((element) => String(element));
	const style = document.style ?? DefaultDocumentStyle;
	const stringArray =
		typeof document.body === "string"
			? document.body.split("")
			: document.body.map(accessor);

	const parsedStrs: string[] = stringArray.map((str) =>
		style.charLength ? str.substring(0, style.charLength) : str,
	);

	const maxLength = Math.max(...parsedStrs.map((s) => countTextLength(s)));
	const paddedStr = parsedStrs.map((s) =>
		padCenterFullWidthChar(s, maxLength, " "),
	);
	const arrayStr = array2String(paddedStr, style);

	const cellLength = maxLength + 2 * style.paddingSpace;
	const topSegmentStrs =
		document.segments?.top.map((segment) =>
			drawSegment(segment, "top", cellLength, document.body.length),
		) || [];
	const bottomSegmentLine =
		document.segments?.bottom.map((segment) =>
			drawSegment(segment, "bottom", cellLength, document.body.length),
		) || [];

	return [...topSegmentStrs, arrayStr, bottomSegmentLine].join("\n");
};

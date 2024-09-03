import type { BorderLineChar, Position } from "./type";

export const BorderChar: Record<Position, BorderLineChar> = {
	leftTop: {
		normal: "┌",
		double: "╔",
		bold: "┏",
	},
	rightTop: {
		normal: "┐",
		double: "╗",
		bold: "┓",
	},
	vertical: {
		normal: "│",
		double: "║",
		bold: "┃",
	},
	horizontal: {
		normal: "─",
		double: "═",
		bold: "━",
	},
	leftBottom: {
		normal: "└",
		double: "╚",
		bold: "┗",
	},
	rightBottom: {
		normal: "┘",
		double: "╝",
		bold: "┛",
	},
	topT: {
		normal: "┬",
		double: "╦",
		bold: "┳",
	},
	bottomT: {
		normal: "┴",
		double: "╩",
		bold: "┻",
	},
	intersection: {
		normal: "┼",
		double: "╬",
		bold: "╋",
	},
	rightT: {
		normal: "┤",
		double: "╣",
		bold: "┫",
	},
	leftT: {
		normal: "├",
		double: "╠",
		bold: "┣",
	},
};

import type { DocumentStyle } from "./type";

export const DefaultDocumentStyle: DocumentStyle = {
	cellHeight: 1,
	cellWidth: 1,
	charLength: 1,
	paddingSpace: 1,
	lineStyle: "normal",
};

export const PADCHAR = " ";

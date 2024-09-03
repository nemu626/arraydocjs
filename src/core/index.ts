import { array2Doc } from "./arraydoc";
import type { ArrayDocument } from "./type";

const SAMPLE_ARRAY: ArrayDocument<string> = {
	body: ["A", "R", "R", "A", "Y"],
	style: {
		cellWidth: 1,
		cellHeight: 1,
		charLength: 0,
		paddingSpace: 1,
		lineStyle: "normal",
	},
	segments: {
		top: [
			{
				startIndex: 1,
				endIndex: 3,
				content: "segmentA",
				lineStyle: "bold",
			},
		],
		bottom: [
			{
				startIndex: 2,
				endIndex: 4,
				content: "segmentB",
				lineStyle: "double",
			},
		],
	},
};

const doc = array2Doc(SAMPLE_ARRAY);

console.log(doc);

function segmentByPattern(text: string, pattern: RegExp): string[] {
	const segments = [];
	let lastIndex = 0;
	const matches = [...text.matchAll(pattern)];
	for (const match of matches) {
		const startIndex = match.index;
		const endIndex = match.index + match[0].length;

		// 1. Extract the text before the current code block
		if (startIndex > lastIndex) {
			segments.push(text.substring(lastIndex, startIndex));
		}

		// 2. Extract the code block itself
		segments.push(match[0]); // match[0] is the entire matched code block with backticks

		lastIndex = endIndex;
	}

	// 3. Extract any remaining text after the last code block
	if (lastIndex < text.length) {
		segments.push(text.substring(lastIndex));
	}

	return segments.filter((segment) => segment !== "");
}

const keywordPattern = /%%keyword:([^%]+)%%/g;
const codeBlockPattern = /```(.*?)?\n(.*?)?\n```/gs;

export { segmentByPattern, keywordPattern, codeBlockPattern };

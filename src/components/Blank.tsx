import { useState } from "react";

const Blank = ({
	text,
	blanks,
	check,
	checkExercise,
}: {
	text: string;
	blanks: Blank[];
	check: boolean;
	checkExercise: () => void;
}) => {
	const [val, setVal] = useState("");

	const handleClick = async () => {
		const clipboardContent = await navigator.clipboard.readText();
		if (blanks.some((b) => b.content === clipboardContent)) {
			setVal(clipboardContent);
			checkExercise();
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVal(e.target.value);
		checkExercise();
	};

	return (
		<label
			className={`inline-block relative after:absolute after:right-3 ${
				check && val === text ? " after:content-['✅'] " : ""
			} ${check && val && val !== text ? "after:content-['🚫']" : ""}`}
		>
			<input
				required
				type="text"
				name="blank"
				value={val}
				pattern={text}
				spellCheck={false}
				onClick={handleClick}
				onBlur={checkExercise}
				onChange={handleChange}
				style={{ minWidth: `${text.length + 4}ch` }}
				className={`border-2 input field-sizing-content pr-10 mx-1 bg-base-300/20 w-[unset] max-w-fit text-lg ${val && check ? "valid:border-2 valid:border-green-700 invalid:border-2 invalid:border-red-700" : ""}`}
			/>
		</label>
	);
};

export default Blank;

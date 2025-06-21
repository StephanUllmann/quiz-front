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
				type="text"
				name="blank"
				value={val}
				pattern={text}
				spellCheck={false}
				required
				onClick={handleClick}
				onChange={handleChange}
				onBlur={checkExercise}
				className={` border-2 input  mx-1 bg-base-300/20 w-[unset] min-w-[0px] max-w-fit text-lg ${val && check ? "valid:border-2 valid:border-green-700 invalid:border-2 invalid:border-red-700" : ""}`}
			/>
		</label>
	);
};

export default Blank;

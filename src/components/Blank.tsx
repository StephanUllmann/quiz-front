import { useState } from "react";

const Blank = ({
	text,
	blanks,
	check,
	checkExercise,
	inCode,
}: {
	text: string;
	blanks: Blank[];
	check: boolean;
	checkExercise: () => void;
	inCode?: boolean;
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
			className={`opacity-100 inline-block relative after:absolute after:right-3 ${
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
				style={{
					minWidth: inCode ? `${text.length + 10.5}ch` : `${text.length + 4}ch`,
					// width: inCode ? `${text.length + 10}ch` : "unset",
				}}
				className={`!opacity-100 border-2 input field-sizing-content pr-10 mx-1 bg-base-300/20 w-[unset] max-w-fit text-lg ${val && check ? "valid:border-2 valid:border-green-700 invalid:border-2 invalid:border-red-700" : ""} ${inCode ? "bg-black m-0 p-0 leading-0 h-[22px] -translate-x-2 pl-1" : ""}`}
			/>
		</label>
	);
};

export default Blank;

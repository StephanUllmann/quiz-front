const Question = ({ currQuestion, check, handleChange }: QuestionProps) => {
	return (
		<div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg space-y-5">
			<h2 className="card-title">{currQuestion?.question}</h2>
			<div className="flex flex-col gap-3">
				{currQuestion?.choices.map((choice) => (
					<label
						key={choice.id}
						className={`text-[#f9f7f7]  bg-[#6054e8] hover:bg-[#6ec1e4] hover:text-[#292929] has-checked:bg-blue-800 has-checked:text-[#f9f7f7] text rounded py-3 px-7 cursor-pointer ${
							check &&
							currQuestion.userAnswer === choice.id &&
							currQuestion.userAnswer === currQuestion.answer.id
								? "has-checked:bg-green-600 has-checked:!text-[#292929]"
								: ""
						}
      ${
				check &&
				currQuestion.userAnswer === choice.id &&
				currQuestion.userAnswer !== currQuestion.answer.id
					? "has-checked:!bg-[#f8485e]"
					: ""
			}`}
					>
						<input
							type="radio"
							name={currQuestion?.question}
							checked={currQuestion.userAnswer === choice.id}
							onChange={() => handleChange(currQuestion.question, choice.id)}
						/>
						<span className="ml-5">{choice.text}</span>
					</label>
				))}
			</div>
		</div>
	);
};

export default Question;

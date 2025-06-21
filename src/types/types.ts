declare global {
	type Question = {
		question: string;
		choices: { id: number; text: string }[];
		answer: { id: number; text: string };
	};

	type Cloze = {
		redHerrings: string[];
		// solution: string;
		textWithBlanks: string;
	};

	type QuizType = {
		questions: Question[];
		cloze: Cloze;
	};

	type QuestionSelection = Question & {
		userAnswer: null | number;
		type: "question";
	};

	type ClozeSelection = Cloze & { type: "cloze" };

	type Selections = (QuestionSelection | ClozeSelection)[];

	type QuestionProps = {
		currQuestion: QuestionSelection;
		check: boolean;
		handleChange: (questionID: string, choiceId: number) => void;
	};

	type BlankFlags = true | false | "redHerring" | "unset";

	type Blank = {
		content: string;
		flag: BlankFlags;
	};
}

import { useEffect, useState } from "react";
// import example from './example.json';
import Quiz from "./components/Quiz";
const mdFilePath = new URL(window.location.href).searchParams.get("file");

function App() {
	const [quiz, setQuiz] = useState<null | QuizType>(null);

	useEffect(() => {
		const controller = new AbortController();
		console.log({ mdFilePath });
		const fetchGeneratedQuiz = async () => {
			if (!mdFilePath) return;
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/questions`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ url: encodeURIComponent(mdFilePath) }),
					signal: controller.signal,
				});

				const data = await res.json();
				// const data = example;
				console.log(data);
				setQuiz({ questions: data.questions, cloze: data.cloze });
			} catch (error) {
				console.log(error);
			}
		};
		if (!mdFilePath) return;
		fetchGeneratedQuiz();

		return () => controller.abort();
	}, []);

	return (
		<div className="w-full h-screen p-5">
			<div className=" h-full ">
				{/* <div className='grid border-t border-base-300 h-80'> */}
				{quiz ? (
					<Quiz quiz={quiz} />
				) : (
					<span className="loading loading-ring loading-xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
				)}
				{/* </div> */}
			</div>
		</div>
	);
}

export default App;

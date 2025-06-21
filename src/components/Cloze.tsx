import { useRef, useState, useMemo } from "react";
import Blank from "./Blank";

const Cloze = ({
	data,
	check,
	setCheck,
}: {
	data: ClozeSelection;
	check: boolean;
	setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [isCorrect, setIsCorrect] = useState(false);
	const [clipboardContent, setClipboardContent] = useState("");
	const containerRef = useRef<HTMLFormElement>(null);

	const [blanks, setBlanks] = useState<Blank[]>(
		data.redHerrings.map((b) => ({ content: b, flag: "redHerring" })),
	);
	const textParts = useMemo(
		() =>
			data.textWithBlanks.split("%%").map((part) => {
				if (part.startsWith("keyword:")) {
					const word = part.slice(8);
					setBlanks((b) => {
						if (b.some((bl) => bl.content === word)) return b;
						return [...b, { content: word, flag: "unset" } as Blank].toSorted(
							() => Math.random() - 0.5,
						);
					});
					return word;
				}
				return part;
			}),
		[data.textWithBlanks],
	);

	const handleClipboardClick = async (text: string) => {
		if (clipboardContent === text) {
			await navigator.clipboard.writeText("");
			setClipboardContent("");
		} else {
			await navigator.clipboard.writeText(text);
			setClipboardContent(text);
		}
	};

	const checkExercise = () => {
		setIsCorrect(containerRef.current?.checkValidity() ?? false);
		setCheck(containerRef.current?.checkValidity() ?? false);
	};

	return (
		<div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg space-y-5">
			<h2 className="text-2xl font-bold ">Fill in the blanks</h2>

			<form ref={containerRef} className="text-lg leading-loose">
				{textParts.map((part, ind) => {
					if (blanks.some((b) => b.content === part)) {
						return (
							<Blank
								key={part + ind}
								text={part}
								blanks={blanks}
								check={check}
								checkExercise={checkExercise}
							/>
						);
					}
					return part;
				})}
			</form>
			{isCorrect ? (
				<p className="text-green-600 font-semibold">✅ Yeah, that's right!</p>
			) : (
				<div className="space-y-3">
					<p className="text-gray-600 text-sm">
						Click on a word to copy it to your clipboard:
					</p>
					<div className="flex flex-wrap gap-3">
						{blanks.map((b, ind) => {
							return (
								<button
									type="button"
									key={b.content + ind}
									className="px-3 py-1 badge badge-info rounded-full cursor-pointer select-none hover:bg-blue-200 transition-colors group relative"
									onClick={() => handleClipboardClick(b.content)}
								>
									{b.content}
									<span
										className={`ml-2 transition-opacity ${
											clipboardContent === b.content
												? "opacity-100"
												: "opacity-0"
										} group-hover:opacity-100`}
									>
										<svg
											className="h-4 w-4 inline-block fill-current"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 32 32"
										>
											<title>Copy to clipboard</title>
											{clipboardContent !== b.content ? (
												<path d="M 16 3 C 14.742188 3 13.847656 3.890625 13.40625 5 L 6 5 L 6 28 L 26 28 L 26 5 L 18.59375 5 C 18.152344 3.890625 17.257313 3 16 3 Z M 16 5 C 16.554688 5 17 5.445313 17 6 L 17 7 L 20 7 L 20 9 L 12 9 L 12 7 L 15 7 L 15 6 C 15 5.445313 15.445313 5 16 5 Z M 8 7 L 10 7 L 10 11 L 22 11 L 22 7 L 24 7 L 24 26 L 8 26 Z" />
											) : (
												<path d="M 16 2 C 14.742188 2 13.847656 2.890625 13.40625 4 L 5 4 L 5 29 L 27 29 L 27 4 L 18.59375 4 C 18.152344 2.890625 17.257313 2 16 2 Z M 16 4 C 16.554688 4 17 4.445313 17 5 L 17 6 L 20 6 L 20 8 L 12 8 L 12 6 L 15 6 L 15 5 C 15 4.445313 15.445313 4 16 4 Z M 7 6 L 10 6 L 10 10 L 22 10 L 22 6 L 25 6 L 25 27 L 7 27 Z M 21.28125 13.28125 L 15 19.5625 L 11.71875 16.28125 L 10.28125 17.71875 L 14.28125 21.71875 L 15 22.40625 L 15.71875 21.71875 L 22.71875 14.71875 Z" />
											)}
										</svg>
									</span>
								</button>
							);
						})}
					</div>
				</div>
			)}
			<div className="text-xs text-gray-500 mt-4">
				💡 Tip: You can type directly in the blank spaces or paste copied words
			</div>
		</div>
	);
};

// const Cloze = ({ data }: { data: ClozeSelection }) => {
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [clipboardContent, setClipboardContent] = useState('');
//   const textEl = useRef<null | HTMLParagraphElement>(null);

//   const textWithBlanks = useRef(data.textWithBlanks.replaceAll('[BLANK]', '<span contenteditable></span>'));

//   return (
//     <div className='card space-y-5'>
//       <h2 className='card-title'>Fill in the blanks</h2>
//       <div
//         ref={textEl}
//         dangerouslySetInnerHTML={{ __html: textWithBlanks.current }}
//         className='*:[span]:border *:[span]:rounded *:[span]:p-1 *:[span]:mx-2 *:[span]:inline-block *:[span]:min-w-42'
//         onBlur={() => setIsCorrect(textEl.current?.innerText === data.solution)}
//       />
//       {isCorrect ? (
//         <p>Yeah, that's right!</p>
//       ) : (
//         <div className='flex gap-5 '>
//           {data.blanks.map((b) => (
//             <div
//               key={b}
//               className='badge badge-info cursor-pointer select-none group'
//               onClick={async () => {
//                 navigator.clipboard.writeText(b).then(() => setClipboardContent(b));
//               }}
//             >
//               {b}
//               <span className={`${clipboardContent === b ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}>
//                 <svg className='h-5 w-5 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
//                   {clipboardContent !== b ? (
//                     <path d='M 16 3 C 14.742188 3 13.847656 3.890625 13.40625 5 L 6 5 L 6 28 L 26 28 L 26 5 L 18.59375 5 C 18.152344 3.890625 17.257813 3 16 3 Z M 16 5 C 16.554688 5 17 5.445313 17 6 L 17 7 L 20 7 L 20 9 L 12 9 L 12 7 L 15 7 L 15 6 C 15 5.445313 15.445313 5 16 5 Z M 8 7 L 10 7 L 10 11 L 22 11 L 22 7 L 24 7 L 24 26 L 8 26 Z'></path>
//                   ) : (
//                     <path d='M 16 2 C 14.742188 2 13.847656 2.890625 13.40625 4 L 5 4 L 5 29 L 27 29 L 27 4 L 18.59375 4 C 18.152344 2.890625 17.257813 2 16 2 Z M 16 4 C 16.554688 4 17 4.445313 17 5 L 17 6 L 20 6 L 20 8 L 12 8 L 12 6 L 15 6 L 15 5 C 15 4.445313 15.445313 4 16 4 Z M 7 6 L 10 6 L 10 10 L 22 10 L 22 6 L 25 6 L 25 27 L 7 27 Z M 21.28125 13.28125 L 15 19.5625 L 11.71875 16.28125 L 10.28125 17.71875 L 14.28125 21.71875 L 15 22.40625 L 15.71875 21.71875 L 22.71875 14.71875 Z'></path>
//                   )}
//                 </svg>
//               </span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

export default Cloze;

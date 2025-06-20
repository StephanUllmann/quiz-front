import { useState } from 'react';
import Question from './Question';
import Cloze from './Cloze';

const Quiz = ({ quiz }: { quiz: QuizType }) => {
  const [userSelections, setUserSelections] = useState<Selections>(() =>
    quiz.questions
      .map((q): Selections[number] => ({
        ...q,
        userAnswer: null,
        type: 'question',
        choices: q.choices.toSorted(() => Math.random() - 0.5),
      }))
      .concat({
        ...quiz.cloze,
        blanks: quiz.cloze.blanks.toSorted(() => Math.random() - 0.5),
        type: 'cloze',
      } as Selections[number])
  );
  const [currInd, setCurrInd] = useState(0);
  const [check, setCheck] = useState(false);

  const currQuestion = userSelections[currInd];

  const handleNext = (num: number) => {
    const nextInd = currInd + num;
    let ind = nextInd;
    if (nextInd > userSelections.length - 1) ind = 0;
    else if (nextInd < 0) ind = userSelections.length - 1;
    setCurrInd(ind);
  };

  const handleChange = (questionID: string, choiceId: number) => {
    setUserSelections((selections) =>
      selections.map((q) => {
        if (q.type === 'question' && q.question === questionID) {
          return { ...q, userAnswer: choiceId };
        }
        return q;
      })
    );
  };

  return (
    <div className='card card-dash bg-base-100 w-full'>
      <div className='m-2 flex justify-between'>
        <div className='join'>
          <button className='join-item btn' onClick={() => handleNext(-1)}>
            «
          </button>
          <button className='join-item btn'>Question {currInd + 1}</button>
          <button className='join-item btn' onClick={() => handleNext(1)}>
            »
          </button>
        </div>
        <button className='btn btn-info' onClick={() => setCheck((c) => !c)}>
          Check
        </button>
      </div>
      <div className='card-body'>
        {/* Question */}
        {currQuestion.type === 'question' && (
          <Question currQuestion={currQuestion} check={check} handleChange={handleChange} />
        )}
        {/*  */}
        {currQuestion.type === 'cloze' && <Cloze data={currQuestion} />}
      </div>
    </div>
  );
};

export default Quiz;

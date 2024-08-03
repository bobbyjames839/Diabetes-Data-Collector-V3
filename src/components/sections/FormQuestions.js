import '../styles/FormQuestions.css';

export const FormQuestions = () => {

  const Question = ({ question, id }) => {
    return (
      <div className={`form_question ${id}`}>
        <h3 className='form_question_title'>{question}</h3>
        <input className='form_question_input' id={id} />
      </div>
    );
  };

  return (
      <div className='form_second_half'>
        <h1 className='form_second_half_title'>Answer the following questions</h1>
        <Question question='How much insulin did you inject?' id='insulinInjected' />
        <Question question='What was your level before the meal?' id='levelBefore' />
        <Question question='What was your level 2 hours after the meal?' id='levelTwo' />
        <Question question='What was the time when you ate?' id='time' />
        <Question question='How many carbs did you have within the 2 hours after your meal?' id='carbsTwo' />
        <Question question='How many exercise points do you have in the previous 24 hours?' id='exercisePoints' />
        <Question question='How many units of alcohol have you consumed in the previous 24 hours?' id='alcoholPoints' />
        <Question question='How many exercise points do you have within the 2 hours after your meal?' id='exercisePointsAfter' />
      </div>
  );
};

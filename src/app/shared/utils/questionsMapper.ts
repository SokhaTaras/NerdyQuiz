import {
  Answer,
  FetchedQuestion,
  Question
} from '@a-questions/interfaces/question';

export function mapQuestions(fetchedQuestions: FetchedQuestion[]): Question[] {
  console.log('all questions: ', fetchedQuestions);
  console.log('first question: ', fetchedQuestions[0]);

  console.log(
    'first question incorrect answers: ',
    fetchedQuestions[0].correct_answer
  );
  return fetchedQuestions.map((fetchedQuestion) => {
    const title = fetchedQuestion?.question;
    const type = fetchedQuestion?.type;
    const answers = mapAnswers(
      fetchedQuestion?.correct_answer,
      fetchedQuestion?.incorrect_answers
    );

    return { title, type, answers };
  });
}

function mapAnswers(
  correctAnswer: string | undefined,
  incorrectAnswers: string[] | undefined
): Answer[] {
  const answers: Answer[] = [];

  if (correctAnswer !== undefined && incorrectAnswers !== undefined) {
    answers.push({ text: correctAnswer, isCorrect: true });

    incorrectAnswers?.forEach((incorrectAnswer) => {
      answers.push({ text: incorrectAnswer, isCorrect: false });
    });
  }

  return answers;
}

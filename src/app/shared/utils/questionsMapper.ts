import {
  Answer,
  FetchedQuestion,
  Question
} from '@a-questions/interfaces/question';

export function mapQuestion(fetchedQuestions: FetchedQuestion): Question {
  const mappedQuestion: Question = {
    title: fetchedQuestions?.question,
    type: fetchedQuestions?.type,
    answers: mapAnswers(
      fetchedQuestions?.correct_answer,
      fetchedQuestions?.incorrect_answers
    )
  };

  return mappedQuestion;
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

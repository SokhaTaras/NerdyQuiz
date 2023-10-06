import {
  Answer,
  FetchedQuestion,
  Question
} from '@a-questions/interfaces/question';

export function mapQuestion(fetchedQuestions: FetchedQuestion): Question {
  const mappedAnswers = mapAnswers(
    fetchedQuestions?.correct_answer,
    fetchedQuestions?.incorrect_answers
  );

  const mappedQuestion: Question = {
    title: fetchedQuestions?.question,
    type: fetchedQuestions?.type,
    answers: mappedAnswers
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
  const shuffledAnswers = shuffleArray(answers);

  return shuffledAnswers;
}

function shuffleArray(answers: Answer[]): Answer[] {
  const shuffledAnswers = answers
    .map((value) => ({ value, random: Math.random() }))
    .sort((a, b) => a.random - b.random)
    .map(({ value }) => value);
  return shuffledAnswers;
}

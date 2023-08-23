export const getNewQuizId = (): string => {
  const decimalSystem = 10;
  return new Date().getTime().toString(decimalSystem);
};

export const getNewQuestionId = (): string => {
  const hexadecimalSystem = 16;
  return new Date().getTime().toString(hexadecimalSystem);
};

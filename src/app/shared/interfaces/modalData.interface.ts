export interface ModalDataInterface {
  isSave: boolean;
  title: string;
  buttonText: string;
  currentQuizId?: string;
}

export interface confirmModalInterface {
  text: string;
  buttonText: string;
  questionIndex?: number;
  quizId?: string;
}

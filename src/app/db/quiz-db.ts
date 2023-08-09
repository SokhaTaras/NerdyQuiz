import {IQuiz} from "../interfaces/quiz.interface";

export const  carQuiz: IQuiz = {
  "title": "Car knowledge",
  "theme": "Automobiles",
  "type": "multiple",
  "questions": [{
    "question": "Which car faster?",
    "correct_answer": "audi a6",
    "incorrect_answers": ["VW golf","BMW X1","Renault Megan"]
  },
    {
      "question": "Max engine volume of Passat",
      "correct_answer": "2.0",
      "incorrect_answers": ["1.6","2.5","3.0"]
    }
  ]
}

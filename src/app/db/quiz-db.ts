import {IQuiz} from "../interfaces/quiz.interface";

export const allQuizzes: IQuiz[] = [
  {
    "title": "Countries Square",
    "theme": "Geography",
    "type": "multiple",
    "id": 2,
    "questions": [
      {
        "question": "Which country is known as the 'Land of the Rising Sun'?",
        "correct_answer": "Japan",
        "incorrect_answers": ["China", "South Korea", "Vietnam"]
      },
      {
        "question": "Which country is famous for its pyramids?",
        "correct_answer": "Egypt",
        "incorrect_answers": ["Mexico", "Greece", "Italy"]
      },
      {
        "question": "What is the largest country by land area?",
        "correct_answer": "Russia",
        "incorrect_answers": ["Canada", "China", "USA"]
      },
      {
        "question": "Which country is known for the Great Wall?",
        "correct_answer": "China",
        "incorrect_answers": ["Japan", "South Korea", "India"]
      },
      {
        "question": "In which country is the city of Paris located?",
        "correct_answer": "France",
        "incorrect_answers": ["Italy", "Spain", "Germany"]
      },
      {
        "question": "Which country is home to the Amazon Rainforest?",
        "correct_answer": "Brazil",
        "incorrect_answers": ["Peru", "Colombia", "Venezuela"]
      },
      {
        "question": "Which country is famous for its tulips and windmills?",
        "correct_answer": "Netherlands",
        "incorrect_answers": ["Belgium", "Denmark", "Sweden"]
      },
      {
        "question": "Which country is known as the 'Land Down Under'?",
        "correct_answer": "Australia",
        "incorrect_answers": ["New Zealand", "South Africa", "Argentina"]
      },
      {
        "question": "In which country is the ancient city of Rome located?",
        "correct_answer": "Italy",
        "incorrect_answers": ["Greece", "Spain", "France"]
      },
      {
        "question": "Which country is famous for its fjords and Northern Lights?",
        "correct_answer": "Norway",
        "incorrect_answers": ["Sweden", "Finland", "Denmark"]
      }
    ]
  },
  {
    "title": "Car Knowledge",
    "theme": "Automobiles",
    "type": "multiple",
    "id": 1,
    "questions": [
      {
        "question": "Which car is faster?",
        "correct_answer": "Audi A6",
        "incorrect_answers": ["VW Golf", "BMW X1", "Renault Megan"]
      },
      {
        "question": "Max engine volume of VW Passat",
        "correct_answer": "2.0",
        "incorrect_answers": ["1.6", "2.5", "3.0"]
      },
      {
        "question": "Choose the most expensive car",
        "correct_answer": "BMW 740",
        "incorrect_answers": ["BMW 540", "Audi A3", "VW Arteon"]
      },
      {
        "question": "Which car company produces the Mustang?",
        "correct_answer": "Ford",
        "incorrect_answers": ["Chevrolet", "Dodge", "Toyota"]
      },
      {
        "question": "Which car has the nickname 'Bug'?",
        "correct_answer": "Volkswagen Beetle",
        "incorrect_answers": ["Ferrari LaFerrari", "Chevrolet Corvette", "Lamborghini Aventador"]
      },
      {
        "question": "What is the top speed of a Bugatti Chiron?",
        "correct_answer": "261 mph (420 km/h)",
        "incorrect_answers": ["218 mph (350 km/h)", "286 mph (460 km/h)", "247 mph (398 km/h)"]
      },
      {
        "question": "What year was the first Ford Model T produced?",
        "correct_answer": "1908",
        "incorrect_answers": ["1915", "1922", "1903"]
      },
      {
        "question": "Which car brand has a prancing horse as its logo?",
        "correct_answer": "Ferrari",
        "incorrect_answers": ["Lamborghini", "Porsche", "Maserati"]
      },
      {
        "question": "What does the acronym 'SUV' stand for?",
        "correct_answer": "Sport Utility Vehicle",
        "incorrect_answers": ["Super Urban Vehicle", "Speedy Undercarriage Vehicle", "Safe Undercover Van"]
      },
      {
        "question": "What car is known as the 'People's Car'?",
        "correct_answer": "Volkswagen Beetle",
        "incorrect_answers": ["Ford Model T", "Chevrolet Impala", "Toyota Corolla"]
      }
    ]
  }
]

export const quizzes: IQuiz[] = allQuizzes

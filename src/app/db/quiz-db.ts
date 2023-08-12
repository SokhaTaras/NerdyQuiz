import { Quiz } from '../interfaces/quiz.interface';
export const allQuizzes: Quiz[] = [
  {
    title: 'Countries Square',
    theme: 'Geography',
    type: 'multiple',
    id: 2,
    questions: [
      {
        question: `Which country is known as the Land of the Rising Sun'?`,
        correctAnswer: 'Japan',
        incorrectAnswers: ['China', 'South Korea', 'Vietnam'],
      },
      {
        question: 'Which country is famous for its pyramids?',
        correctAnswer: 'Egypt',
        incorrectAnswers: ['Mexico', 'Greece', 'Italy'],
      },
      {
        question: 'What is the most idiotic country?',
        correctAnswer: 'Russia',
        incorrectAnswers: ['Canada', 'China', 'USA'],
      },
      {
        question: 'Which country is known for the Great Wall?',
        correctAnswer: 'China',
        incorrectAnswers: ['Japan', 'South Korea', 'India'],
      },
      {
        question: 'In which country is the city of Paris located?',
        correctAnswer: 'France',
        incorrectAnswers: ['Italy', 'Spain', 'Germany'],
      },
      {
        question: 'Which country is home to the Amazon Rainforest?',
        correctAnswer: 'Brazil',
        incorrectAnswers: ['Peru', 'Colombia', 'Venezuela'],
      },
      {
        question: 'Which country is famous for its tulips and windmills?',
        correctAnswer: 'Netherlands',
        incorrectAnswers: ['Belgium', 'Denmark', 'Sweden'],
      },
      {
        question: `Which country is known as the 'Land Down Under ?'`,
        correctAnswer: 'Australia',
        incorrectAnswers: ['New Zealand', 'South Africa', 'Argentina'],
      },
      {
        question: 'In which country is the ancient city of Rome located?',
        correctAnswer: 'Italy',
        incorrectAnswers: ['Greece', 'Spain', 'France'],
      },
      {
        question: 'Which country is famous for its fjords and Northern Lights?',
        correctAnswer: 'Norway',
        incorrectAnswers: ['Sweden', 'Finland', 'Denmark'],
      },
    ],
  },
  {
    title: 'Car Knowledge',
    theme: 'Automobiles',
    type: 'multiple',
    id: 1,
    questions: [
      {
        question: 'Which car is faster?',
        correctAnswer: 'Audi A6',
        incorrectAnswers: ['VW Golf', 'BMW X1', 'Renault Megan'],
      },
      {
        question: 'Max engine volume of VW Passat',
        correctAnswer: '2.0',
        incorrectAnswers: ['1.6', '2.5', '3.0'],
      },
      {
        question: 'Choose the most expensive car',
        correctAnswer: 'BMW 740',
        incorrectAnswers: ['BMW 540', 'Audi A3', 'VW Arteon'],
      },
      {
        question: 'Which car company produces the Mustang?',
        correctAnswer: 'Ford',
        incorrectAnswers: ['Chevrolet', 'Dodge', 'Toyota'],
      },
      {
        question: `Which car has the nickname 'Bug'?'`,
        correctAnswer: 'Volkswagen Beetle',
        incorrectAnswers: [
          'Ferrari LaFerrari',
          'Chevrolet Corvette',
          'Lamborghini Aventador',
        ],
      },
      {
        question: 'What is the top speed of a Bugatti Chiron?',
        correctAnswer: '261 mph (420 km/h)',
        incorrectAnswers: [
          '218 mph (350 km/h)',
          '286 mph (460 km/h)',
          '247 mph (398 km/h)',
        ],
      },
      {
        question: 'What year was the first Ford Model T produced?',
        correctAnswer: '1908',
        incorrectAnswers: ['1915', '1922', '1903'],
      },
      {
        question: 'Which car brand has a prancing horse as its logo?',
        correctAnswer: 'Ferrari',
        incorrectAnswers: ['Lamborghini', 'Porsche', 'Maserati'],
      },
      {
        question: `What does the acronym 'SUV' stand for?`,
        correctAnswer: 'Sport Utility Vehicle',
        incorrectAnswers: [
          'Super Urban Vehicle',
          'Speedy Undercarriage Vehicle',
          'Safe Undercover Van',
        ],
      },
      {
        question: `What car is known as the 'People's Car'?'`,
        correctAnswer: 'Volkswagen Beetle',
        incorrectAnswers: [
          'Ford Model T',
          'Chevrolet Impala',
          'Toyota Corolla',
        ],
      },
    ],
  },
];

export const quizzes: Quiz[] = allQuizzes;

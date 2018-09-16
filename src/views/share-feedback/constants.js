export const SET_QUESTIONS = 'SET_QUESTIONS';
export const CURRENT_USER_ID = 5;

export const PERIOD_OPTIONS = [
  { id: 1, month: 'January 2018' },
  { id: 2, month: 'February 2018' },
  { id: 3, month: 'March 2018' },
  { id: 4, month: 'April 2018' },
  { id: 5, month: 'May 2018' },
  { id: 6, month: 'June 2018' },
  { id: 7, month: 'July 2018' },
  { id: 8, month: 'August 2018' },
  { id: 9, month: 'September 2018' },
  { id: 10, month: 'October 2018' },
  { id: 11, month: 'November 2018' },
  { id: 12, month: 'December 2018' },
];

export const QUESTIONS = [
  {
    id: 1,
    question: 'How much do you trust this person to deliver high quality work?',
    type: 'scale',
    skippable: false,
  },
  {
    id: 2,
    question: 'Is this person up to date with the latest accounting regulations?',
    type: 'multiple-choice',
    skippable: false,
    options: [
      {
        id: 1,
        text: 'Not fully. You should work on trying to stay more up to date with regulations',
      },
      {
        id: 2,
        text: 'Yes, you are reasonably up to date with new regulations.',
      },
      {
        id: 3,
        text: 'Yes, you are the one I look up to when I need information about new regulations',
      },
    ],
  },
  {
    id: 3,
    question: 'How well does this person understand the technical domain of our product?',
    type: 'scale',
    skippable: false,
  },
  {
    id: 4,
    question: 'Have there been any situations where this person could have managed their emotions better? What happened?',
    type: 'text',
    skippable: true,
  },
  {
    id: 5,
    question: 'Does this person care about our users and treats customer support as a high priority?',
    type: 'multiple-choice',
    skippable: false,
    options: [
      {
        id: 1,
        text: 'Not always - you should work on this aspect',
      },
      {
        id: 2,
        text: 'Yes, you go out of our way to help our users and improve their experience',
      },
      {
        id: 3,
        text: 'Yes, your understanding of our users and the empathy you demonstrate is second to none',
      },
    ],
  },
  {
    id: 6,
    question: 'What would you like this person to work on the most during the next month, to enable their continued growth?',
    type: 'text',
    skippable: false,
  },
  {
    id: 7,
    question: 'How transparent and clear are this person\'s plans and work tasks?',
    type: 'multiple-choice',
    skippable: false,
    options: [
      {
        id: 1,
        text: 'I frequently not know what you are working on, please work with me to raise visibility',
      },
      {
        id: 2,
        text: 'I almost always know what you are working on, but not always the details or next steps, only the outcomes you are after.',
      },
      {
        id: 3,
        text: 'Your plans are clear and readily available to those around you, and I always know what the next step is.',
      },
    ],
  },
  {
    id: 8,
    question: 'How well does this person understand our business goals and roadmap?',
    type: 'scale',
    skippable: false,
  },
  {
    id: 9,
    question: 'Is there anything else you\'d like to share with this person?',
    type: 'text',
    skippable: true,
  },
];

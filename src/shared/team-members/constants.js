export const UPDATE_MEMBER_FEEDBACK = 'UPDATE_MEMBER_FEEDBACK';
export const TEAM_FEEDBACK = [
  {
    userId: 5,
    feedback: [
      {
        period: {
          id: 9,
          month: 'September 2018',
        },
        response: [
          {
            id: 1,
            question: 'How much do you trust this person to deliver high quality work?',
            type: 'scale',
            skippable: false,
            response: '3 / 10',
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
            response: [
              {
                id: 1,
                text: 'Not fully. You should work on trying to stay more up to date with regulations',
              },
              {
                id: 2,
                text: 'Yes, you are reasonably up to date with new regulations.',
              },
            ],
          },
          {
            id: 3,
            question: 'How well does this person understand the technical domain of our product?',
            type: 'scale',
            skippable: false,
            response: '8 / 10',
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
            response: [
              {
                id: 2,
                text: 'Yes, you go out of our way to help our users and improve their experience',
              },
            ],
          },
          {
            id: 6,
            question: 'What would you like this person to work on the most during the next month, to enable their continued growth?',
            type: 'text',
            skippable: false,
            response: 'swe',
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
            response: [
              {
                id: 1,
                text: 'I frequently not know what you are working on, please work with me to raise visibility',
              },
            ],
          },
          {
            id: 8,
            question: 'How well does this person understand our business goals and roadmap?',
            type: 'scale',
            skippable: false,
            response: '7 / 10',
          },
          {
            id: 9,
            question: 'Is there anything else you\'d like to share with this person?',
            type: 'text',
            skippable: true,
            response: 'EHRR',
          },
        ],
      },
    ],
  },
];

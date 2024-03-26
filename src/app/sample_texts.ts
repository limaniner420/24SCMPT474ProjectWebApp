export interface textList {
    title: string;
    introduction: string;
    body: string;
    comments: string[];
  }
  
  export const textlists = [
    {
        title: 'First text',
        introduction: 'This text is the first',
        body: 'It was a dark and stormy night',
        comments: ['What are these 1', 'Comment number 2']
    },
    {
        title: 'Second text',
        introduction: 'This text is the second',
        body: 'It was a bright and sunny day',
        comments: ['AAAAAAAAAAAAAAAAAAAAAAAAAAAA 2']
    },
    {
        title: 'Third text',
        introduction: 'This text is the third',
        body: 'What is all of this?',
        comments: ['Only comment for 3']
    }
  ];
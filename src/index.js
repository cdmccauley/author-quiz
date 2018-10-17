// create-react-app imports
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// stylesheet imports
import './index.css';

// redux and react-redux imports
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

// react-router-dom imports
import { BrowserRouter, Route } from 'react-router-dom';

// underscore imports
import { shuffle, sample } from 'underscore';

// component imports
import AddAuthorForm from './AddAuthorForm';
import AuthorQuiz from './AuthorQuiz';

// application data set
const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'The Adventures of Huckleberry Finn',
      'Life on the Mississippi',
      'Roughing It',
    ],
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: [
      'Heart of Darkness',
      'Lord Jim',
      'The Secret Agent',
    ],
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/authors/jkrowling.jpeg',
    imageSource: 'Wikimedia Commons',
    books: [
      'Harry Potter and the Sorcerers Stone',
      'The Silkworm',
      'The Casual Vacancy',
    ],
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'The Shining',
      'IT',
      'Pet Cemetery'
    ],
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.png',
    imageSource: 'Wikimedia Commons',
    books: [
      'David Copperfield',
      'A Tale of Two Cities',
      'A Christmas Carol',
    ],
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'Hamlet',
      'Macbeth',
      'Romeo and Juliet',
    ],
  },
];

// returns data set for game turn
function getTurnData(authors) {

  // get all books from data set
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);

  // get first four books from data set after shuffle
  // shuffle imported from underscore
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);

  // get random book title from fourRandomBooks to be used as answer
  // sample imported from underscore
  const answer = sample(fourRandomBooks);

  // find author of the book being used for the answer and return turn data set
  return {
    books: fourRandomBooks,
    author: authors.find((author) => 
      author.books.some((title) => 
        title === answer))
  };

};

// function resetState() {
//   return {
//     turnData: getTurnData(authors),
//     highlight: '',
//   };
// };

function reducer(state = { authors, turnData: getTurnData(authors), highlight: ''}, action) {
  switch (action.type) {
    case 'ANSWER_SELECTED':
      const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
      return Object.assign({}, state, { highlight: isCorrect ? 'correct' : 'wrong' });
    case 'CONTINUE':
      return Object.assign({}, state, { highlight: '', turnData: getTurnData(state.authors)});
    case 'ADD_AUTHOR':
      return Object.assign({}, state, { authors: state.authors.concat([action.author])});
    default:
      return state;
  }
};

let store = Redux.createStore(reducer);

// initial state
// has turn data for use in turn
// has blank highlight for white background
//let state = resetState();

// answer click event handler
// determines if correct answer was clicked and sets background color
// function onAnswerSelected(answer) {
//   const isCorrect = state.turnData.author.books.some((book) => book === answer);
//   state.highlight = isCorrect ? 'correct' : 'wrong';
//   render();
// };

// render wrapper function allows declarative updates
// function render() {
//   ReactDOM.render(
//     <BrowserRouter>
//       <React.Fragment>
//         <Route exact path="/" component={ App } />
//         <Route path="/add" component={ AuthorWrapper } />
//       </React.Fragment>
//     </BrowserRouter>, document.getElementById('root')
//   );
// }

ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={ store }>
      <React.Fragment>
        <Route exact path="/" component={ AuthorQuiz } />
        <Route path="/add" component={ AddAuthorForm } />
      </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>, document.getElementById('root')
);

// render app
// render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

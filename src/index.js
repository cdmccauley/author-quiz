// imports from create-react-app
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';

// imports from react-router-dom
import { BrowserRouter, Route, withRouter } from 'react-router-dom';

// imports from underscore
import { shuffle, sample } from 'underscore';

// component imports
import AddAuthorForm from './AddAuthorForm';

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

function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: '',
  };
};

// initial state
// has turn data for use in turn
// has blank highlight for white background
let state = resetState();

// answer click event handler
// determines if correct answer was clicked and sets background color
function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
};

function App() {
  return(
    <AuthorQuiz { ...state } 
      onAnswerSelected={ onAnswerSelected } 
      onContinue={ () => {
        state = resetState();
        render();
      } } />
  );
};

const AuthorWrapper = withRouter(({ history }) =>
  <AddAuthorForm onAddAuthor={ (author) => {
    authors.push(author);
    history.push('/');
  } } />
);

// render wrapper function allows declarative updates
function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={ App } />
        <Route path="/add" component={ AuthorWrapper } />
      </React.Fragment>
    </BrowserRouter>, document.getElementById('root')
  );
}

// render app
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

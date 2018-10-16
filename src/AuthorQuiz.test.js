// react imports
import React from 'react';
import ReactDOM from 'react-dom';

// component imports
import AuthorQuiz from './AuthorQuiz';

// enzyme imports
import Enzyme, { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// configure enzyme
Enzyme.configure({ adapter: new Adapter() });

// declare state
// provides data set for tests
const state = {
  turnData: {
    books: [
      'The Adventures of Huckleberry Finn',
      'The Shining',
      'David Copperfield',
      'Romeo and Juliet',
    ],
    author: {
      name: 'Mark Twain',
      imageUrl: 'images/authors/marktwain.jpg',
      imageSource: 'Wikimedia Commons',
      books: [
        'The Adventures of Huckleberry Finn',
        'Life on the Mississippi',
        'Roughing It',
      ],
    },
  },
  highlight: 'none',
};

describe("Author Quiz", () => {

  it("renders without crashing", () => {
    const div = document.createElement("div"); // creates mount point
    ReactDOM.render(<AuthorQuiz { ...state } onAnswerSelected={ () => { } }/>, div); // creates instance of component and mounts
  });

  describe("When no answer has been selected", () => {
    // declaration
    let wrapper;
    
    // setup
    // onAnsweredSelected is empty because its not being used
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz { ...state } onAnswerSelected={ () => { } } />
      );
    });

    // test expected background color prop
    it("should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    });

  });

  describe("When the wrong answer has been selected", () => {
    // declaration
    let wrapper;

    // setup
    // overrides initial state of highlight
    // onAnsweredSelected is empty because its not being used
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz { ...(Object.assign({}, state, { highlight: 'wrong' })) } onAnswerSelected={ () => { } } />
      );
    });

    // test expected background color prop
    it("should have a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
    });
  });

  describe("When the correct answer has been selected", () => {
    // declaration
    let wrapper;

    // setup
    // overrides initial state of highlight
    // onAnsweredSelected is empty because its not being used
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz { ...(Object.assign({}, state, { highlight: 'correct' })) } onAnswerSelected={ () => { } } />
      );
    });

    // test expected background color prop
    it("should have a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
    });
  });

  describe("When the first answer is selected", () => {
    // declarations
    let wrapper;
    const handleAnswerSelected = jest.fn(); // creates a mock function

    // setup
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz { ...state } onAnswerSelected={ handleAnswerSelected } />
      );
      wrapper.find('.answer').first().simulate('click'); // simulates click event on correct answer
    });

    // test function call
    it("onAnswerSelected should be called", () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    // test function parameter
    // uses first book title from collection explicitly
    it("should recieve The Adventures of Huckleberry Finn", () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith("The Adventures of Huckleberry Finn");
    });
  });

});


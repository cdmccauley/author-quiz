import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';

describe("Author Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div"); // creates mount point
    ReactDOM.render(<AuthorQuiz />, div); // creates instance of component and mounts
  })
})
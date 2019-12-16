import React from 'react';
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  wait,
} from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import  'jest-dom/extend-expect';

// interface btnDom extends HTMLButtonElement {

// }

// interface inputDom extends HTMLInputElement {

// }


function getExampleDOM() {
  // This is just a raw example of setting up some DOM
  // that we can interact with. Swap this with your UI
  // framework of choice 😉
  const div = document.createElement('div')
  div.innerHTML = `
    <label for="username">Username</label>
    <input id="username" />
    <button>Print Username</button>
  `
  const button: HTMLButtonElement | null = div.querySelector('button')
  const input: HTMLInputElement | null  = div.querySelector('input')
  button && button.addEventListener('click', () => {
    // let's pretend this is making a server request, so it's async
    // (you'd want to mock this imaginary request in your unit tests)...
    setTimeout(() => {
      const printedUsernameContainer = document.createElement('div')
      printedUsernameContainer.innerHTML = `
        <div data-testid="printed-username">${input ? input.value : null}</div>
      `
      div.appendChild(printedUsernameContainer)
    }, Math.floor(Math.random() * 200))
  })
  return div
}

test('examples of some things', async () => {
  const container = getExampleDOM()

  // Get form elements by their label text.
  // An error will be thrown if one cannot be found (accessibility FTW!)
  const div: HTMLElement | null = getByLabelText(container, 'Username')
  div.innerHTML = 'xxxxx'

  // Get elements by their text, just like a real user does.
  getByText(container, 'Print Username').click()

  await wait(() =>
    expect(queryByTestId(container, 'printed-username')).toBeTruthy()
  )

  // getByTestId and queryByTestId are an escape hatch to get elements
  // by a test id (could also attempt to get this element by its text)
  // expect(getByTestId(container, 'printed-username')).toHaveTextContent(
  //   'xxxxx'
  // )
  // jest snapshots work great with regular DOM nodes!
  expect(container).toMatchSnapshot()
})
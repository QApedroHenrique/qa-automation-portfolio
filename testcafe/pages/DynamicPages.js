import { Selector } from 'testcafe';

const BASE_URL = 'https://the-internet.herokuapp.com';

export const dynamicLoading = {
  url: `${BASE_URL}/dynamic_loading/2`,
  startButton: Selector('#start button'),
  loadingIndicator: Selector('#loading'),
  result: Selector('#finish h4'),
};

export const dynamicControls = {
  url: `${BASE_URL}/dynamic_controls`,
  checkbox: Selector('#checkbox'),
  checkboxToggle: Selector('#checkbox-example button'),
  checkboxMessage: Selector('#checkbox-example #message'),
  textInput: Selector('#input-example input[type="text"]'),
  inputToggle: Selector('#input-example button'),
  inputMessage: Selector('#input-example #message'),
};

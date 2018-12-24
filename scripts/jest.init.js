import 'jest-enzyme/lib/index';

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

registerRequireContextHook();

// mock console.info calls for cleaner test execution
global.console.info = jest.fn().mockImplementation(() => {});

// mock local storage calls
const localStorageMock = {
  getItem: jest.fn().mockName('getItem'),
  setItem: jest.fn().mockName('setItem'),
  clear: jest.fn().mockName('clear'),
};
global.localStorage = localStorageMock;

configure({ adapter: new Adapter() });

/* Fail tests on PropType warnings
 This allows us to throw an error in tests environments when there are prop-type warnings. This should keep the tests
 free of warnings going forward.
 */

const ignoredWarnings = [
  'The pseudo class ":nth-child" is potentially unsafe when doing server-side rendering. Try changing it to "nth-of-type"',
];

const throwError = message => {
  if (!ignoredWarnings.find(warning => message === warning)) {
    throw new Error(message);
  }
};

global.console.error = throwError;
global.console.warn = throwError;

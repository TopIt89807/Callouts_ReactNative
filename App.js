import React from 'react';
import { Provider } from 'react-redux'
import Root from 'src/containers/Root';
import setupStore from 'src/redux/setup';

const store = setupStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root/>
      </Provider>
    );
  }
}

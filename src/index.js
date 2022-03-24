import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import ErrorBoundary from './components/ErrorBoundry';


ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Provider store={store}><App /></Provider>
    </BrowserRouter>
  </ErrorBoundary>
  , document.getElementById('root')
)

//ReactDOM.render(<h1>troubleshoot</h1>, document.getElementById('root'))
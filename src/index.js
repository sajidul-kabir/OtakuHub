import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import CommunityStore from './Store/communityReducer'
import thunk from 'redux-thunk'
const rootReducer=combineReducers({
  communityStore:CommunityStore,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

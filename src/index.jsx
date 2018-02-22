import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  loginInfo: {
    id: 1,
    name: "hemisu",
    openid: "[CrHt2*1C5",
    token: "Rs7oE1ZJNb",
  },
};
const loginReducer = (state, action) => {
  switch(action.type) {
    case 'loginSuccess':
      return {
        ...state,
        id: action.data.id,
        name: action.data.name,
        openid: action.data.openid,
        token: action.data.token
      };
    default:
      return {...state};
  }
};

const reducers = combineReducers({loginInfo: loginReducer});
const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

import App from './components/App';
import Stage1 from './components/Stage1';
import Stage2 from './components/Stage2';
import Stage3 from './components/Stage3';
import Login from './pages/login';
import Communication from './pages/communication';
import Take from './pages/record';

import './index.less';

class Index extends React.Component {
  render() {
    return (
      <div className="body">
        <h1>Stages list</h1>
        <ul role="nav">
          <li><Link to="/s1">ListView + Carousel</Link></li>
          <li><Link to="/s2">Tabs + ...</Link></li>
          <li><Link to="/s3">Form + ...</Link></li>
          <li><Link to="/login">login + ...</Link></li>
          <li><Link to="/communication">communication+ ...</Link></li>
          <li><Link to="/take/record">take/record + ...</Link></li>
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Index } />
        <Route path="s1" component={ Stage1 } />
        <Route path="s2" component={ Stage2 } />
        <Route path="s3" component={ Stage3 } />
      </Route>
      <Route path="login" component={ Login } />
      <Route path="communication" component={ Communication } />
      <Route path="take">
        <Route path="record" component={ Take } />
      </Route>

    </Router>
  </Provider>
  , document.getElementById('app'));
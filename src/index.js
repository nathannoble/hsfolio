import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import Main from './containers/Main'

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <App />
                {/* <Route exact path="/" component={Main} />
                <Route path="/acquire" render={(props) => (<Acquire {...props} state={window.nodes} />)} />
                <Route path="/explore" component={Explore} />
                <Route path="/governNew" component={GovernNew} />
                <Route path="/operationalize" component={Operationalize} />
                <Route path="/monitor" component={Monitor} />
                <Route path="/about" component={About} /> */}
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

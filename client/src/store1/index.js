import {applyMiddleware, legacy_createStore, compose} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const store = legacy_createStore(reducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
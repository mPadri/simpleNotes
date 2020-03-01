import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';

/**
 * thunk -> middleware di redux untuk action dispatch agar berjalan asyncronus
 * dokumentasi -> https://github.com/reduxjs/redux-thunk
 */
import thunk from 'redux-thunk';

export const store = createStore(reducer, applyMiddleware(thunk));

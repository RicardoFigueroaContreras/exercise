/* eslint no-debugger: 0*/
import {combineReducers} from 'redux';
import assign from 'object-assign';

import vendingReducers from '../../vendingmachine/reducers/index';

const allReducers = assign({}, vendingReducers);

export default combineReducers(allReducers);
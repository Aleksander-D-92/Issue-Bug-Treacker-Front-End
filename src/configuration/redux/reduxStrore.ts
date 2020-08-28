import {Action, combineReducers, createStore} from 'redux';

function userLoggedIn(state = false, action: Action) {
    switch (action.type) {
        case 'userLoggedIn':
            return true;
        case 'userLoggedOut':
            return false;
        default:
            return state;
    }
}

interface userDetailsActions {
    type: string,
    payload: {}
}


function userDetails(state = {}, action: userDetailsActions) {
    switch (action.type) {
        case 'userDetails':
            return action.payload;
        default:
            return state;
    }
}

interface UserDetails {
    id: number,
    username: string,
    authority: string,
    exp: string
    authorizationHeader: string
}

export interface ReduxState {
    userLoggedIn: boolean,
    userDetails: UserDetails
}

const rootReducer = combineReducers({userLoggedIn: userLoggedIn, userDetails: userDetails});
// @ts-ignore
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export const store = createStore(rootReducer, reduxDevTools);


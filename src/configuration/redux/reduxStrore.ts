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
    authorities: string,
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
// @ts-ignore
// export const store = compose(reduxDevTools)(createStore)(rootReducer, {});
export const store = createStore(rootReducer, reduxDevTools);

// store.dispatch({type: 'INCREMENT', payload: 12});
// interface CustomAction {
//     type: string,
//     payload: number
// }
//
// function increment(state = 0, action: CustomAction) {
//     switch (action.type) {
//         case 'INCREMENT':
//             return state + action.payload;
//         case 'DECREMENT':
//             return state - 1;
//         default:
//             return state;
//     }
// }


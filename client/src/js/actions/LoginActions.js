import ActionTypes from './ActionTypes';
import {dispatch} from '../utils/Dispatcher';

export default {
    auth(userId) {
        dispatch({
            type: ActionTypes.AUTH,
            payload: {
                userId: userId
            },
        })
    },
}
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/index';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
        case DELETE_POST: {
            return _.omit(state, action.payload);
        }
        case FETCH_POST: {
            // console.log('Inside reducer: ', action.payload.data);
            return { ...state, [action.payload.data.id]: action.payload.data };
            // const post = action.payload.date;
            // const newState = { ...state };
            // newState[post.id] = post;
            // return newState;
        }
        case FETCH_POSTS: {
            // console.log(action.payload.data);
            return _.mapKeys(action.payload.data, 'id');
        }
        default: return state;
    }
} 
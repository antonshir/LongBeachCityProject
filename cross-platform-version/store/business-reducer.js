import Business from '../models/business';
import { ADD_BUSINESS } from './business-actions';

const initialState = {
    businesses: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUSINESS:
            const newBusiness = new Business(new Date().toString(), action.businessData.title);
            return {
                businesses: state.businesses.concat(newBusiness)
            };
        default:
            return state;
    }
};
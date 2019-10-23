export const ADD_BUSINESS = 'ADD_BUSINESS'; 

export const addBusiness = title => {
    return { type: ADD_BUSINESS, businessData: { title: title } };
};
import  assign from  'object-assign';

const TYPE_GET_STOCK_SUMMARY = "GET_STOCK_SUMMARY";

const initialState = {
        'StockSummary': [],
};

export default (state = initialState, action) => {
    
    switch (action.type) {
        case TYPE_GET_STOCK_SUMMARY: {
            return assign({}, state, {'StockSummary': action.payload});
        }
        default:
            return state;
    }
 };
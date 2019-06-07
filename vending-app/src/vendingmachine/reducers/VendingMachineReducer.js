import  assign from  'object-assign';

const TYPE_GET_MACHINE_CONFIG = "GET_MACHINE_CONFIG";
const TYPE_SET_AMOUNT_PAID = "SET_AMOUNT_PAID";
const TYPE_GET_DRINKS = "GET_DRINKS";
const TYPE_SET_SELECTED_DRINK = "SET_SELECTED_DRINK";
const TYPE_SET_SNACKBAR = "SET_SNACKBAR";

const initialState = {
        'MachineConfig': {allowDollar : false},
        'AmountPaid': null,
        'SelectedDrink': null,
        'Drinks': [],
        'SnackBarFlag': {open: false, message: '', type: 'success', buttonFlag: false}
};

export default (state = initialState, action) => {
    
    switch (action.type) {
        case TYPE_GET_MACHINE_CONFIG: {
            return assign({}, state, {'MachineConfig': action.payload});
        }
        case TYPE_SET_AMOUNT_PAID: {
            return assign({}, state, {'AmountPaid': action.payload});
        }
        case TYPE_GET_DRINKS: {
            return assign({}, state, {'Drinks': action.payload});
        }
        case TYPE_SET_SELECTED_DRINK: {
            return assign({}, state, {'SelectedDrink': action.payload});
        }
        case TYPE_SET_SNACKBAR: {
            return assign({}, state, {'SnackBarFlag': action.payload});
        }
        default:
            return state;
    }
 };
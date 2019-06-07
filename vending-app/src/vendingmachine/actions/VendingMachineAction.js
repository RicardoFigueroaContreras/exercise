import apiUtil from '../../commons/apis/vendingMachinaApi';

const TYPE_GET_MACHINE_CONFIG = "GET_MACHINE_CONFIG";
const TYPE_SET_AMOUNT_PAID = "SET_AMOUNT_PAID";
const TYPE_GET_DRINKS = "GET_DRINKS";
const TYPE_SET_SELECTED_DRINK = "SET_SELECTED_DRINK";

const TYPE_SET_SNACKBAR = "SET_SNACKBAR";

const BASE_URI_MACHINE = "/machine";
const BASE_URI_DRINKS = "/product/machine";
const BASE_URI_SALE = "/sale";
const config = {
    headers: {'Content-Type': 'application/json'}
};

export const getMachineConfig = (machineId) => async dispatch => {
    const reponse = await apiUtil.get(`${BASE_URI_MACHINE}/${machineId}`);
    dispatch({
        type: TYPE_GET_MACHINE_CONFIG,
        payload: reponse.data
    });
};

export const setAmountPaid = (amount) => async dispatch => {
    dispatch({
        type: TYPE_SET_AMOUNT_PAID,
        payload: amount
    });
};

export const getDrinks = (machineId) => async dispatch => {
    const reponse = await apiUtil.get(`${BASE_URI_DRINKS}/${machineId}`);
    dispatch({
        type: TYPE_GET_DRINKS,
        payload: reponse.data
    });
};

export const setSelectedDrink = (selectedDrink) => async dispatch => {
    dispatch({
        type: TYPE_SET_SELECTED_DRINK,
        payload: selectedDrink
    });
};

export const saveSale = (sale) => dispatch => {
    apiUtil.post(BASE_URI_SALE, sale, config)
    .catch((error) => {
        if (error.response) {
            if (error.response.data) {
                if (error.response.data.message) {
                    dispatch({
                        type: TYPE_SET_SNACKBAR,
                        payload: {open: true, message: error.response.data.message, type: 'error', buttonFlag: false}
                    });
                }
            }
        }

    });
};

export const closeSnaskbar = () => async dispatch => {
    dispatch({
        type: TYPE_SET_SNACKBAR,
        payload: {open: false, message: '', type: 'success', buttonFlag: false}
    });
};

export const showSnaskbar = (snackbarConfig) => async dispatch => {
    dispatch({
        type: TYPE_SET_SNACKBAR,
        payload: snackbarConfig
    });
};




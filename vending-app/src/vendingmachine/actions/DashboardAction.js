import apiUtil from '../../commons/apis/vendingMachinaApi';


const TYPE_GET_STOCK_SUMMARY = "GET_STOCK_SUMMARY";
const TYPE_GET_MACHINE_CONFIG = "GET_MACHINE_CONFIG";

const BASE_URI_PRODUCTS = "/product/machine";
const BASE_URI_MACHINE = "/machine";

const config = {
    headers: {'Content-Type': 'application/json'}
};


export const getStockSummary = (machineId) => async dispatch => {
    const reponse = await apiUtil.get(`${BASE_URI_PRODUCTS}/${machineId}`);
    dispatch({
        type: TYPE_GET_STOCK_SUMMARY,
        payload: reponse.data
    });
};

export const putMachine = (machine) => async dispatch => {
    const reponse = await apiUtil.put(`${BASE_URI_MACHINE}`, machine, config);
    dispatch({
        type: TYPE_GET_MACHINE_CONFIG,
        payload: reponse.data
    });
};





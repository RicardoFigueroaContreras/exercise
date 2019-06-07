import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:9080/vending/api/v1"
});
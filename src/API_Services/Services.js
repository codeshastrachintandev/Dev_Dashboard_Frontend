
import { message } from "antd";
import axios from "axios";


const token = JSON.parse(sessionStorage.getItem("token"));
// if (token == null) {
//     alert("Your Session is expired");
// }
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

export default async function Services() {
    return (<></>);
}
export async function GET(endpoint) {
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT_DEV}${endpoint}`, config)
        .then(response => {
            if (response.data.success) {
                //message.success(response.data.message);  
                return response.data; // Returning the data instead of the whole response
            } else {
                if (response.data.statusCode) {
                    message.error(response.data.message);
                    throw new Error('API request was not successfully ' + response.data.message);
                } else {
                    throw new Error('API request was not successfully');
                }
            }
        })
        .catch(error => {
            console.error('Error Creating data:', error.message);
            return Promise.reject(error); // Propagate the error
        });
}

export async function GetwithParams(endpoint, payload) {

    return axios.get(`${process.env.REACT_APP_API_ENDPOINT_DEV}${endpoint}`, payload, config)
        .then(response => {
            if (response.data.success) {
                message.success(response.data.message);
                return response.data; // Returning the data instead of the whole response
            } else {
                if (response.data.statusCode) {
                    message.error(response.data.message);
                    throw new Error('API request was not successfully ' + response.data.message);
                } else {
                    throw new Error('API request was not successfully');
                }
            }
        })
        .catch(error => {
            console.error('Error Creating data:', error.message);
            return Promise.reject(error); // Propagate the error
        });
}

export async function POST(endpoint, payload) {
    return axios.post(`${process.env.REACT_APP_API_ENDPOINT_DEV}${endpoint}`, payload, config)
        .then(response => {
            if (response.data.success) {
                message.success(response.data.message);
                return response.data; // Returning the data instead of the whole response
            } else {
                if (response.data.statusCode) {
                    message.error(response.data.message);
                    throw new Error('API request was not successfully ' + response.data.message);
                } else {
                    throw new Error('API request was not successfully');
                }
            }
        })
        .catch(error => {
            console.error('Error Creating data:', error.message);
            return Promise.reject(error); // Propagate the error
        });
}

export async function LoginMethod(payload) {
    return axios.post(`${process.env.REACT_APP_API_ENDPOINT_DEV}/Login/Login`, payload)
        .then(response => {
            if (response.data.success) {
                message.success(response.data.message);
                console.log(response.data.data.token);
                sessionStorage.setItem("token", JSON.stringify(response.data.data.token));
            } else {
                if (response.data.statusCode) {
                    message.error(response.data.message);
                    throw new Error('API request was not successfully ' + response.data.message);
                } else {
                    throw new Error('API request was not successfully');
                }
            }
        })
        .catch(error => {
            console.error('Error Creating data:', error.message);
            return Promise.reject(error); // Propagate the error
        });
}

export async function Delete(endpoint) {

    return axios.delete(`${process.env.REACT_APP_API_ENDPOINT_DEV}${endpoint}`, config)
        .then(response => {
            if (response.data.success) {
                message.success(response.data.message);
                return response.data; // Returning the data instead of the whole response
            } else {
                if (response.data.statusCode) {
                    message.error(response.data.message);
                    throw new Error('API request was not successfully ' + response.data.message);
                } else {
                    throw new Error('API request was not successfully');
                }
            }
        })
        .catch(error => {
            console.error('Error Creating data:', error.message);
            return Promise.reject(error); // Propagate the error
        });
}
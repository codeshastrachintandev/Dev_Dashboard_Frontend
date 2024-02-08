import { message } from "antd";
import axios from "axios";

export default async function Create(endpoint,payload){
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT_DEV}${endpoint}`,payload)
        .then(response => {
            if (response.data.success) {
                message.success('Create successfully');  
                return response.data; // Returning the data instead of the whole response
            } else {
                if(response.data.statusCode){
                    message.error(response.data.message);  
                    throw new Error('API request was not successfully '+response.data.message);
                }else{
                    throw new Error('API request was not successfully');
                }
            }
        })
        .catch(error => {
            console.error('Error Creating data:', error.message);
            return Promise.reject(error); // Propagate the error
        });
}
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();


// Add a request interceptor
function initGlobalHttpInterceptors() {
    axios.interceptors.request.use((config) => {
        const localHostDevServerUrl = 'http://localhost:8080';
        config.url = localHostDevServerUrl + config.url
        toast.success(`${config.method?.toUpperCase()} to ${config.url}`, {position: toast.POSITION.BOTTOM_RIGHT})
        return config;
    }, function (error) {
        toast.error('request interceptor error', {position: toast.POSITION.BOTTOM_RIGHT})
        return Promise.reject(error);
    });

// Add a response interceptor
    axios.interceptors.response.use(function (response) {
        toast.success('response interceptor success', {position: toast.POSITION.BOTTOM_RIGHT})
        return response;
    }, function (error) {
        // let errorDescription = '';
        // if (error.response.data.message === undefined) {
        //     errorDescription = error.response.data;
        // } else {
        //     errorDescription = error.response.data.message;
        // }
        // toast.error(`Response ERROR status : ${error.response.status}  Description : ${errorDescription}`, {position: toast.POSITION.BOTTOM_RIGHT})
        return Promise.reject(error);
    });
}

export {initGlobalHttpInterceptors}

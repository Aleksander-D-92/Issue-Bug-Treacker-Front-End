import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect} from "react";
import {readCookieByKeyName} from "../../views/shared/functions";

toast.configure();


function AxiosGlobalInterceptors() {
    useEffect(() => {
        axios.interceptors.request.use((config) => {
            console.log(`request`);
            console.log(config);

            const baseUrl = 'http://localhost:8080';
            config.url = baseUrl + config.url;
            let jwt = readCookieByKeyName('jwt');
            if (jwt !== undefined && jwt !== null) {
                config.headers.Authorization = `Bearer ${jwt}`;
            }
            toast.success(`${config.method?.toUpperCase()} to ${config.url}`, {position: toast.POSITION.BOTTOM_RIGHT})
            return config;
        }, function (error) {
            toast.error('request interceptor error', {position: toast.POSITION.BOTTOM_RIGHT})
            return Promise.reject(error);
        });

// Add a response interceptor
        axios.interceptors.response.use(function (response) {
            console.log(`response`);
            console.log(response);
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
    }, [])

    return (
        <React.Fragment/>
    )
}

export {AxiosGlobalInterceptors}

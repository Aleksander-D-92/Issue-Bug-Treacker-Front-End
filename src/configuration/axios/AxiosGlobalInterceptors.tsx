import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect} from "react";
import {readCookieByKeyName} from "../../views/shared/functions";

toast.configure();


function AxiosGlobalInterceptors() {
    useEffect(() => {
        axios.interceptors.request.use((config) => {
            const method = config.method;
            const baseUrl = 'http://localhost:8080';
            config.url = baseUrl + config.url;

            const jwt = readCookieByKeyName('jwt');
            if (jwt !== undefined && jwt !== null) {
                config.headers.Authorization = `Bearer ${jwt}`;
            }
            switch (method) {
                case "get":
                    toast.info(`${config.method?.toUpperCase()} to ${config.url}`, {position: toast.POSITION.BOTTOM_RIGHT})
                    break;
                case "post":
                    toast.success(`${config.method?.toUpperCase()} to ${config.url}`, {position: toast.POSITION.BOTTOM_RIGHT})
                    break;
                case "put":
                    toast.warning(`${config.method?.toUpperCase()} to ${config.url}`, {position: toast.POSITION.BOTTOM_RIGHT})
                    break;
                case "delete":
                    toast.error(`${config.method?.toUpperCase()} to ${config.url}`, {position: toast.POSITION.BOTTOM_RIGHT})
                    break;
            }
            return config;
        }, function (error) {
            toast.error('request interceptor error', {position: toast.POSITION.BOTTOM_RIGHT})
            return Promise.reject(error);
        });

        //Response interceptor
        axios.interceptors.response.use(function (response) {
            toast.success(`${response.status} ${response.statusText}`, {position: toast.POSITION.BOTTOM_RIGHT})
            return response;
        }, function (error) {
            console.log(error);
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

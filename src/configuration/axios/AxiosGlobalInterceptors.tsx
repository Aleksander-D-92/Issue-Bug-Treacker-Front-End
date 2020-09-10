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
            const toastUrl = config.url;
            config.url = baseUrl + config.url;

            const jwt = readCookieByKeyName('jwt');
            if (jwt !== undefined && jwt !== null) {
                config.headers.Authorization = `Bearer ${jwt}`;
            }
            switch (method) {
                case "get":
                    toast.info(`${config.method?.toUpperCase()} ${toastUrl}`, {position: toast.POSITION.BOTTOM_RIGHT})
                    break;
                case "post":
                    toast.success(`${config.method?.toUpperCase()} ${toastUrl}`, {position: toast.POSITION.BOTTOM_RIGHT})
                    break;
                case "put":
                    toast.warning(`${config.method?.toUpperCase()} ${toastUrl}`, {position: toast.POSITION.BOTTOM_RIGHT})
                    break;
                case "delete":
                    toast.error(`${config.method?.toUpperCase()} ${toastUrl}`, {position: toast.POSITION.BOTTOM_RIGHT})
                    break;
            }
            return config;
        }, function (error) {
            toast.error('request interceptor error', {position: toast.POSITION.BOTTOM_RIGHT})
            return Promise.reject(error);
        });

        //Response interceptor
        axios.interceptors.response.use(function (response) {
            if (response.data.message !== null && response.data.message !== undefined) {
                toast.success(`${response.status}: ${response.data.message}`, {position: toast.POSITION.BOTTOM_RIGHT})
            } else {
                toast.success(`${response.status}`, {position: toast.POSITION.BOTTOM_RIGHT})
            }
            return response;
        }, function (error) {
            if (error.response === undefined) {
                return Promise.reject(error);
            }
            if (error.response.data !== null) {
                toast.error(`${error.response.status}: ${error.response.data.message}`, {position: toast.POSITION.BOTTOM_RIGHT})
            } else {
                toast.error(`${error.response.status}`, {position: toast.POSITION.BOTTOM_RIGHT})
            }
            return Promise.reject(error);
        });
    }, [])

    return (
        <React.Fragment/>
    )
}

export {AxiosGlobalInterceptors}

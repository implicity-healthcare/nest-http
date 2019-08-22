import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from 'axios';

export interface IHTTPClient extends AxiosStatic {
}

export interface IHTTPClientInstance extends AxiosInstance {
}

export interface IHTTPRequestConfiguration extends AxiosRequestConfig {

}

export interface IHTTPClientConfiguration {
    target?: string;
    request?: IHTTPRequestConfiguration;
}

export type IHTTPClientBuilder = (clientConfiguration?: IHTTPClientConfiguration) => IHTTPClientInstance;

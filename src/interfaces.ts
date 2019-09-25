import { NHCInstance  } from './classes/NHCInstance';
import { RequestPromiseOptions } from 'request-promise';

export interface NHCRequestOptions extends RequestPromiseOptions {
    errorHandler?: Function
}

export interface NHCConfiguration {
    target?: string,
    request?: NHCRequestOptions
}

export type IHTTPClientBuilder = (options?: NHCConfiguration) => NHCInstance;

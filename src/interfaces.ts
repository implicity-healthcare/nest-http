import { NHCInstance  } from './classes/NHCInstance';
import { RequestPromiseOptions } from 'request-promise';
import { RequestError } from 'request-promise/errors';
import { Headers } from 'request';

export interface NHCError extends RequestError {
    statusCode: number,
}

export interface NHCRequestOptions extends RequestPromiseOptions {
    errorHandler?: (error: NHCError) => void
}

export interface NHCConfiguration {
    target?: string,
    request?: NHCRequestOptions
}

export interface NHCDefaultOptions {
    headers?: Headers;
}

export type NHCBuilder = (options?: NHCConfiguration) => NHCInstance;

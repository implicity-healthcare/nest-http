import { NHCInstance } from './classes/NHCInstance';
import { RequestPromiseOptions } from 'request-promise';
import { RequestError } from 'request-promise/errors';
import { Headers, UriOptions, UrlOptions } from 'request';
import { Url } from "url";

export interface NHCError extends RequestError {
    statusCode: number,
}

export interface NHCConfiguration extends RequestPromiseOptions {
    target?: string,
    errorHandler?: (error: NHCError) => void
    url?: string | Url;
    uri?: string | Url;
}

export interface NHCDefaultOptions {
    headers: Headers;
}

export type NHCBuilder = (options?: NHCConfiguration) => NHCInstance;

import * as requestPromise from 'request-promise';
import * as Bluebird from 'bluebird';
import { NHCRequestOptions } from '../interfaces';
import { Headers } from 'request';



export interface NHCDefaultOptions {
    headers?: Headers;
}

export class NHCInstance {
    public defaults: NHCDefaultOptions = {};

    constructor(
        private readonly options: NHCRequestOptions = {},
    ) {
    }

    get(path: string, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = { ...this.defaults, ...this.options, ...options };

        return requestPromise
            .get(path, configuration)
            .catch(reason => (configuration.errorHandler)
                ? configuration.errorHandler(reason)
                : Bluebird.reject(reason)
            );
    }

    post(path: string, data: any, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = { ...this.defaults, ...this.options, ...options, body: data };

        return requestPromise
            .post(path, configuration)
            .catch(reason => (configuration.errorHandler)
                ? configuration.errorHandler(reason)
                : Bluebird.reject(reason)
            );
    }

    put(path: string, data: any, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = { ...this.defaults, ...this.options, ...options, body: data };

        return requestPromise
            .put(path, configuration)
            .catch(reason => (configuration.errorHandler)
                ? configuration.errorHandler(reason)
                : Bluebird.reject(reason)
            );
    }

    head(path: string, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = { ...this.defaults, ...this.options, ...options};

        return requestPromise
            .head(path, configuration)
            .catch(reason => (configuration.errorHandler)
                ? configuration.errorHandler(reason)
                : Bluebird.reject(reason)
            );
    }

    patch(path: string, data: any, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = { ...this.defaults, ...this.options, ...options, body: data };

        return requestPromise
            .head(path, configuration)
            .catch(reason => (configuration.errorHandler)
                ? configuration.errorHandler(reason)
                : Bluebird.reject(reason)
            );
    }

    delete(path: string, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = { ...this.defaults, ...this.options, ...options };

        return requestPromise
            .delete(path, configuration)
            .catch(reason => (configuration.errorHandler)
                ? configuration.errorHandler(reason)
                : Bluebird.reject(reason)
            );
    }
}

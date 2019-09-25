import * as requestPromise from 'request-promise';
import * as Bluebird from 'bluebird';
import { NHCRequestOptions } from '../interfaces';
import { Headers } from 'request';
import * as Path from 'path';


export interface NHCDefaultOptions {
    headers?: Headers;
}

export class NHCInstance {
    public defaults: NHCDefaultOptions = {};

    constructor(
        private readonly options: NHCRequestOptions = {},
    ) {
    }

    async get(path: string, options: NHCRequestOptions = {}): Promise<any> {
        const [uri, configuration] = this.prepare(path, options);

        return requestPromise
            .get(uri, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    post(path: string, data: any, options: NHCRequestOptions = {}): Bluebird<any> {
        const [uri, configuration] = this.prepare(path, options);

        return requestPromise
            .post(uri, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    put(path: string, data: any, options: NHCRequestOptions = {}): Bluebird<any> {
        const [uri, configuration] = this.prepare(path, options);

        return requestPromise
            .post(uri, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    head(path: string, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = { ...this.defaults, ...this.options, ...options };
        const uri = Path.resolve(configuration.baseUrl || '', path);

        return requestPromise
            .head(uri, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public patch(path: string, data: any, options: NHCRequestOptions = {}): Bluebird<any> {
        const [uri, configuration] = this.prepare(path, options);

        return requestPromise
            .head(uri, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public delete(path: string, options: NHCRequestOptions = {}): Bluebird<any> {
        const [uri, configuration] = this.prepare(path, options);

        return requestPromise
            .delete(uri, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    private handle(configuration, error) {
        return (configuration.errorHandler)
            ? configuration.errorHandler(error)
            : Bluebird.reject(error);
    }

    private prepare(path: string, options: NHCRequestOptions = {}, data?: any): [string, NHCRequestOptions] {
        const configuration = { ...this.defaults, ...this.options, ...options };
        const uri = Path.resolve(configuration.baseUrl || '', path);

        configuration.body = data;

        if (data && typeof data !== 'string' && !(Buffer.isBuffer(data))) {
            try {
                configuration.body = JSON.stringify(data)
            }
            catch (e) {
                configuration.body = undefined
            }
        }

        return [uri, configuration];
    }
}

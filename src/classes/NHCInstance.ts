import * as requestPromise from 'request-promise';
import * as Bluebird from 'bluebird';
import { NHCDefaultOptions, NHCRequestOptions } from '../interfaces';

export class NHCInstance {
    public defaults: NHCDefaultOptions = {};

    constructor(
        private readonly options: NHCRequestOptions = {},
    ) {
    }

    public get(path: string, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = this.prepare(path, options);

        return requestPromise
            .get(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public post(path: string, data: any, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = this.prepare(path, options);

        return requestPromise
            .post(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public put(path: string, data: any, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = this.prepare(path, options);

        return requestPromise
            .post(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public head(path: string, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = this.prepare(path, options);

        return requestPromise
            .head(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public patch(path: string, data: any, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = this.prepare(path, options);

        return requestPromise
            .head(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public delete(path: string, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = this.prepare(path, options);

        return requestPromise
            .delete(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    private handle(configuration, error) {
        return (configuration.errorHandler)
            ? configuration.errorHandler(error)
            : Bluebird.reject(error);
    }

    private prepare(path: string, options: NHCRequestOptions = {}, data?: any): NHCRequestOptions {
        const configuration = { ...this.defaults, ...this.options, ...options };
        configuration.body = data;

        if (data && typeof data !== 'string' && !(Buffer.isBuffer(data))) {
            try {
                configuration.body = JSON.stringify(data)
            } catch (e) {
                configuration.body = undefined
            }
        }

        return configuration;
    }
}

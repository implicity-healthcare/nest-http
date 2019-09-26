import * as requestPromise from 'request-promise';
import * as Bluebird from 'bluebird';
import { NHCDefaultOptions, NHCRequestOptions } from '../interfaces';
import { DefaultOptions } from './NHCDefaultOptions';
import * as _ from 'lodash'
import { Request } from 'request';

export class NHCInstance {
    public defaults: NHCDefaultOptions = new DefaultOptions();

    constructor(
        private readonly options: NHCRequestOptions = {},
    ) {
    }

    public get(path: string, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = this.prepare(options);

        return requestPromise
            .get(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }


    public post(path: string, data: any, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = this.prepare(options, data);

        return requestPromise
            .post(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public put(path: string, data: any, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = this.prepare(options, data);

        return requestPromise
            .put(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public head(path: string, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = this.prepare(options);

        return requestPromise
            .head(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public patch(path: string, data: any, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = this.prepare(options, data);

        return requestPromise
            .patch(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public delete(path: string, options: NHCRequestOptions = {}): Bluebird<any> {
        const configuration = this.prepare(options);

        return requestPromise
            .delete(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public raw(options: NHCRequestOptions = {}): Request {
        const configuration = this.prepare(options);

        return requestPromise(configuration as any)
    }

    private handle(configuration, error) {
        return (configuration.errorHandler)
            ? configuration.errorHandler(error)
            : Bluebird.reject(error);
    }

    private prepare(options: NHCRequestOptions = {}, data?: any): NHCRequestOptions {
        const configuration = _.merge(this.options, this.defaults, options);

        if (data)
            configuration.body = data;

        return configuration;
    }
}

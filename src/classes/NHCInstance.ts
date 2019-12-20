import * as requestPromise from 'request-promise';
import * as Bluebird from 'bluebird';
import { NHCConfiguration, NHCDefaultOptions } from '../interfaces';
import { DefaultOptions } from './NHCDefaultOptions';
import * as _ from 'lodash'
import { Request } from 'request';

export class NHCInstance {
    public defaults: NHCDefaultOptions = new DefaultOptions();

    constructor(
        private readonly options: NHCConfiguration = {},
    ) {
    }

    public get(path: string, options: NHCConfiguration = {}): Bluebird<any> {
        const configuration = this.prepare(options);

        return requestPromise
            .get(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }


    public post(path: string, data: any, options: NHCConfiguration = {}): Bluebird<any> {
        const configuration = this.prepare(options, data);

        return requestPromise
            .post(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public put(path: string, data: any, options: NHCConfiguration = {}): Bluebird<any> {
        const configuration = this.prepare(options, data);

        return requestPromise
            .put(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public head(path: string, options: NHCConfiguration = {}): Bluebird<any> {
        const configuration = this.prepare(options);

        return requestPromise
            .head(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public patch(path: string, data: any, options: NHCConfiguration = {}): Bluebird<any> {
        const configuration = this.prepare(options, data);

        return requestPromise
            .patch(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public delete(path: string, options: NHCConfiguration = {}): Bluebird<any> {
        const configuration = this.prepare(options);

        return requestPromise
            .delete(path, configuration)
            .catch(this.handle.bind(this, configuration));
    }

    public raw(options: NHCConfiguration = {}): Request {
        const configuration = this.prepare(options);

        return requestPromise(configuration as any)
    }

    private handle(configuration, error) {
        return (configuration.errorHandler)
            ? configuration.errorHandler(error)
            : Bluebird.reject(error);
    }

    private prepare(options: NHCConfiguration = {}, data?: any): NHCConfiguration {
        const configuration = _.merge({}, this.options, this.defaults, options);

        if (data)
            configuration.body = data;

        return configuration;
    }
}

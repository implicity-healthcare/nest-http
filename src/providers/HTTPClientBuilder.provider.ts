import { NestHTTPClientBuilderToken } from '../constants';
import { ConfigService } from 'nestjs-config';
import {
    IHTTPClientBuilder,
    IHTTPClientConfiguration,
    IHTTPClientInstance,
    IHTTPRequestConfiguration
} from '../interfaces';
import Axios from 'axios';
import { NestAxiosBridgeErrorHandler } from '../NestAxiosBridgeErrorHandler';

export const HTTPClientBuilderProvider = {
    token: NestHTTPClientBuilderToken,
    provide: NestHTTPClientBuilderToken,
    inject: [
        ConfigService,
    ],
    useFactory: (configService: ConfigService): IHTTPClientBuilder =>
        (configuration: IHTTPClientConfiguration = {}): IHTTPClientInstance => {
            const httpConfiguration: IHTTPRequestConfiguration = configuration.target
                ? configService.get(configuration.target)
                : {};

            const options = { ...httpConfiguration, ...configuration.request };

            const instance = Axios.create({
                timeout: options.timeout,
                baseURL: options.baseURL,
                paramsSerializer: options.paramsSerializer,
            });

            instance.interceptors.response
                .use(response => response, NestAxiosBridgeErrorHandler);

            return instance;
        },
};

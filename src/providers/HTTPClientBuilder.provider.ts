import { NestHTTPClientBuilderToken } from '../constants';
import { ConfigService } from 'nestjs-config';
import {
    IHTTPClientBuilder,
    IHTTPClientConfiguration,
    IHTTPClientInstance,
    IHTTPRequestConfiguration
} from '../interfaces';
import Axios, { AxiosRequestConfig } from 'axios';
import { NestAxiosBridgeErrorHandler } from '../utils/NestAxiosBridgeErrorHandler';

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

            const options: AxiosRequestConfig = { ...httpConfiguration, ...configuration.request };

            const instance = Axios.create(options);

            instance.interceptors.response
                .use(response => response, NestAxiosBridgeErrorHandler);

            return instance;
        },
};

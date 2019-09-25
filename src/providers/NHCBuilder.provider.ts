import { NestHTTPClientBuilderToken } from '../constants';
import { ConfigService } from 'nestjs-config';
import {
    NHCBuilder,
    NHCConfiguration, NHCRequestOptions,
} from '../interfaces';
import { NHCInstance } from '../classes/NHCInstance';
import { NestBridgeErrorHandler } from '../utils/NestBridgeErrorHandler';

export const NHCBuilderProvider = {
    token: NestHTTPClientBuilderToken,
    provide: NestHTTPClientBuilderToken,
    inject: [
        ConfigService,
    ],
    useFactory: (configService: ConfigService): NHCBuilder =>
        (configuration: NHCConfiguration = {}): NHCInstance => {
            const httpConfiguration: NHCRequestOptions = configuration.target
                ? configService.get(configuration.target)
                : {};

            const options: NHCRequestOptions = { ...httpConfiguration, ...configuration.request };
            options.errorHandler = NestBridgeErrorHandler;

            return new NHCInstance(options);
        },
};

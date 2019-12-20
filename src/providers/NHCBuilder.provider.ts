import { NestHTTPClientBuilderToken } from '../constants';
import { NHCBuilder, NHCConfiguration, NHCRequestOptions, } from '../interfaces';
import { NHCInstance } from '..';
import { NestBridgeErrorHandler } from '../utils/NestBridgeErrorHandler';
import { ConfigService } from '@nestjs/config';

export const NHCBuilderProvider = {
    token: NestHTTPClientBuilderToken,
    provide: NestHTTPClientBuilderToken,
    inject: [
        ConfigService,
    ],
    useFactory: (configService: ConfigService): NHCBuilder =>
        (configuration: NHCConfiguration = {}): NHCInstance => {
            const httpConfiguration = configService.get<NHCRequestOptions>(`NHC.${configuration.target}`, {});
            const options: NHCRequestOptions = { ...httpConfiguration, ...configuration.request };
            options.errorHandler = NestBridgeErrorHandler;

            return new NHCInstance(options);
        },
};

import { NestHTTPClientBuilderToken, NestHTTPClientConfigurationNamespace } from '../constants';
import { NHCBuilder, NHCConfiguration, } from '../interfaces';
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
        (localConfiguration: NHCConfiguration = {}): NHCInstance => {
            const globalConfiguration = configService.get<NHCConfiguration>(`${NestHTTPClientConfigurationNamespace}.${localConfiguration.target}`, {});
            const configuration: NHCConfiguration = { ...globalConfiguration, ...localConfiguration };
            configuration.errorHandler = NestBridgeErrorHandler;

            return new NHCInstance(configuration);
        },
};

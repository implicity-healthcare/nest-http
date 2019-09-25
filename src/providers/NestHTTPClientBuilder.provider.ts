import { NestHTTPClientBuilderToken } from '../constants';
import { ConfigService } from 'nestjs-config';
import {
    IHTTPClientBuilder, NHCConfiguration, NHCRequestOptions,
} from '../interfaces';
import { NHCInstance } from '../classes/NHCInstance';

export const NestHTTPClientBuilderProvider = {
    token: NestHTTPClientBuilderToken,
    provide: NestHTTPClientBuilderToken,
    inject: [
        ConfigService,
    ],
    useFactory: (configService: ConfigService): IHTTPClientBuilder =>
        (configuration: NHCConfiguration = {}): NHCInstance => {
            const httpConfiguration: NHCRequestOptions = configuration.target
                ? configService.get(configuration.target)
                : {};

            const options: NHCRequestOptions = { ...httpConfiguration, ...configuration.request };
            options.transform = (body, response, resolveWithFullResponse) => {
                console.log('> response:', response);
            };

            return new NHCInstance(options);
        },
};

import { NestHTTPClientToken } from '../constants';
import { NHCInstance } from '..';

export const NHCClientProvider = {
    token: NestHTTPClientToken,
    provide: NestHTTPClientToken,
    useFactory: () => new NHCInstance(),
};


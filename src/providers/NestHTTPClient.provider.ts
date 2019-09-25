import { NestHTTPClientToken } from '../constants';
import { NHCInstance } from '../classes/NHCInstance';

export const NestHTTPClientProvider = {
    token: NestHTTPClientToken,
    provide: NestHTTPClientToken,
    useFactory: () => new NHCInstance(),
};

import { NestHTTPClientToken } from '../constants';
import { NHCInstance } from '../classes/NHCInstance';

export const NHCClientProvider = {
    token: NestHTTPClientToken,
    provide: NestHTTPClientToken,
    useFactory: () => new NHCInstance(),
};

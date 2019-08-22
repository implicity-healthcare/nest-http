import { NestHTTPClientToken } from '../constants';
import Axios from 'axios';
import { NestAxiosBridgeErrorHandler } from '../NestAxiosBridgeErrorHandler';

export const HTTPClientProvider = {
    token: NestHTTPClientToken,
    provide: NestHTTPClientToken,
    useFactory: () => {
        Axios.interceptors.response
            .use(response => response, NestAxiosBridgeErrorHandler);

        return Axios;
    },
};

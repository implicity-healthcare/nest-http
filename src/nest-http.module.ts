import { HTTPClientProvider } from './providers/HTTPClient.provider';
import { HTTPClientBuilderProvider } from './providers/HTTPClientBuilder.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    exports: [
        HTTPClientProvider,
        HTTPClientBuilderProvider
    ],
    providers: [
        HTTPClientProvider,
        HTTPClientBuilderProvider
    ]
})
export class NestHTTPModule {

}

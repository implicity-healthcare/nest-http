import { NestHTTPClientProvider } from './providers/NestHTTPClient.provider';
import { NestHTTPClientBuilderProvider } from './providers/NestHTTPClientBuilder.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    exports: [
        NestHTTPClientProvider,
        NestHTTPClientBuilderProvider
    ],
    providers: [
        NestHTTPClientProvider,
        NestHTTPClientBuilderProvider
    ]
})
export class NestHTTPModule {

}

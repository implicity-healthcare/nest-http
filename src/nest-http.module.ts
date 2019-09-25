import { NHCClientProvider } from './providers/NHCClient.provider';
import { NHCBuilderProvider } from './providers/NHCBuilder.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    exports: [
        NHCClientProvider,
        NHCBuilderProvider
    ],
    providers: [
        NHCClientProvider,
        NHCBuilderProvider
    ]
})
export class NestHTTPModule {

}

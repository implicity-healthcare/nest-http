import { NHCClientProvider } from './providers/NHCClient.provider';
import { NHCBuilderProvider } from './providers/NHCBuilder.provider';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [
        ConfigService,
    ],
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

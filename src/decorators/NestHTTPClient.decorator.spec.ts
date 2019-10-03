import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { NestHTTPClient } from './NestHTTPClient.decorator';

describe('@NestHTTPClient', () => {
    let metadata;
    let decorator;
    let factoryFunction: Function;
    beforeEach(async () => {
        class Test {
            public test(@NestHTTPClient() client) {
            }
        }

        metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
        const key = Object.keys(metadata)[0];
        decorator = metadata[key];
        factoryFunction = decorator.factory;
    });

    describe('when the decorator does not contains options', () => {
        it('should return an HTTP Client', async () => {
            const result = await factoryFunction();
            await expect(result)
                .toBeInstanceOf(NestHTTPClient)
        });
    });
});

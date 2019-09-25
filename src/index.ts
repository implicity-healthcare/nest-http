import { NotFoundException } from '@nestjs/common';

export * from './constants';
export * from './interfaces';
export * from './nest-http.module';
export * from './decorators/HTTPClient.decorator';
export * from './decorators/HTTPClientBuilder.decorator';

export const suce = async (): Promise<any> => {
    throw new NotFoundException();
};

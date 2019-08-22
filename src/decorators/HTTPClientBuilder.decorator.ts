import { NestHTTPClientBuilderToken } from '../constants';
import { Inject } from '@nestjs/common';

export const HTTPClientBuilder = () => Inject(NestHTTPClientBuilderToken);

import { NestHTTPClientBuilderToken } from '../constants';
import { Inject } from '@nestjs/common';

export const NestHTTPClientBuilder = () => Inject(NestHTTPClientBuilderToken);

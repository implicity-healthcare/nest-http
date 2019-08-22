import { NestHTTPClientBuilderToken, NestHTTPClientToken } from '../constants';
import { Inject } from '@nestjs/common';

export const HTTPClient = () => Inject(NestHTTPClientToken);

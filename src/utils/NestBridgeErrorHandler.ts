import {
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    ImATeapotException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotAcceptableException,
    NotFoundException,
    RequestTimeoutException,
    ServiceUnavailableException,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { RequestError } from 'request-promise/errors';
import * as Bluebird from 'bluebird';

const errorsMap = {
    400: BadRequestException,
    401: UnauthorizedException,
    403: ForbiddenException,
    404: NotFoundException,
    405: MethodNotAllowedException,
    406: NotAcceptableException,
    408: RequestTimeoutException,
    409: ConflictException,
    418: ImATeapotException,
    422: UnprocessableEntityException,
    500: InternalServerErrorException,
    502: BadGatewayException,
    503: ServiceUnavailableException,
    504: GatewayTimeoutException,
};

export interface NHCError extends RequestError {
    statusCode: number,
}

export function NestBridgeErrorHandler(error: NHCError) {
    const exceptionClass = (error && error.statusCode)
        ? errorsMap[error.statusCode]
        : ServiceUnavailableException;

    if (error.response)
        throw new exceptionClass(error.response['body']);

    if (error && error.options )
        throw new exceptionClass(`Unknown error ${error.options}`);


    throw new exceptionClass();
}

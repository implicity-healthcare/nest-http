import { AxiosError } from 'axios';
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

export function NestAxiosBridgeErrorHandler(error: AxiosError) {
    const exceptionClass = error.response ? errorsMap[error.response.status] : InternalServerErrorException;
    if (error.response) {
        return Promise.reject(new exceptionClass(error.response.data));
    }

    const message = `${ error.config && error.config.url } - ${ error.code }`;
    return Promise.reject(new exceptionClass(message));
}

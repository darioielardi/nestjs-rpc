import {
  applyDecorators,
  Controller,
  ControllerOptions,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function RpcController(name: string): ClassDecorator;
export function RpcController(opts: ControllerOptions): ClassDecorator;

export function RpcController(param: string | ControllerOptions) {
  const name = typeof param === 'string' ? param : param.path;
  return applyDecorators(
    ApiTags(name),
    typeof param === 'string' ? Controller(param) : Controller(param),
  );
}

type RpcMethodOptions = Partial<Omit<OperationObject, 'operationId'>> & {
  name?: string;
};

export function RpcMethod(): MethodDecorator;
export function RpcMethod(name: string): MethodDecorator;
export function RpcMethod(opts: RpcMethodOptions): MethodDecorator;

export function RpcMethod(param?: string | RpcMethodOptions): MethodDecorator {
  return function (
    target: Function,
    propertyKey?: string,
    descriptor?: unknown,
  ) {
    const methodName =
      typeof param === 'undefined'
        ? propertyKey
        : typeof param === 'string'
        ? param
        : param.name ?? propertyKey;

    return applyDecorators(
      ApiOperation({
        ...(typeof param === 'object' ? param : {}),
        operationId: methodName,
      }),
      Post(methodName),
    )(target, propertyKey, descriptor);
  };
}

<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS RPC</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Installation

`npm install nestjs-rpc`

## Usage

```typescript
import { RpcController, RpcMethod } from 'nestjs-rpc';

@RpcController('users')
class UsersController {
  @RpcMethod()
  find() {}

  @RpcMethod()
  create() {}
}
```

The example above gives us the following endpoints:

- POST users/find
- POST users/create

#### Swagger

If you are using the `@nestjs/swagger` package to generate OpenAPI specs the RPC methods will automatically have the `ApiOperation` decorator set with the `operationId` attribute set as the method name, and the controller class will have the `ApiTags` decorator with the base path as the tag.

You can also provide all the `ApiOperation` options to the `RpcMethod` decorator, except for the `operationId` attribute which will be set as the method name unless specified with the `name` attribute.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

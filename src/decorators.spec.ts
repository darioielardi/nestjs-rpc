import * as request from 'supertest';
import { INestApplication, Module, Controller } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { RpcController, RpcMethod } from './decorators';

@RpcController('app')
class AppController {
  @RpcMethod()
  hello() {
    return 'hello';
  }

  @RpcMethod('explicit')
  test() {
    return 'explicit';
  }

  @RpcMethod({ name: 'options' })
  other() {
    return 'options';
  }
}

@Module({ controllers: [AppController] })
class AppModule {}

describe('Decorators', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const mod: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = mod.createNestApplication();
    await app.init();
  });

  test('method name', () => {
    return request(app.getHttpServer())
      .post('/app/hello')
      .expect(201)
      .expect('hello');
  });

  test('explicit operation name', () => {
    return request(app.getHttpServer())
      .post('/app/explicit')
      .expect(201)
      .expect('explicit');
  });

  test('method options', () => {
    return request(app.getHttpServer())
      .post('/app/options')
      .expect(201)
      .expect('options');
  });
});

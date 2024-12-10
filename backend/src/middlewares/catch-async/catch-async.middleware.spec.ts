import { CatchAsyncMiddleware } from './catch-async.middleware';

describe('CatchAsyncMiddleware', () => {
  it('should be defined', () => {
    expect(new CatchAsyncMiddleware()).toBeDefined();
  });
});

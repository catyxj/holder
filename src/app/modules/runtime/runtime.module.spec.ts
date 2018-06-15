import { RuntimeModule } from './runtime.module';

describe('RuntimeModule', () => {
  let runtimeModule: RuntimeModule;

  beforeEach(() => {
    runtimeModule = new RuntimeModule();
  });

  it('should create an instance', () => {
    expect(runtimeModule).toBeTruthy();
  });
});

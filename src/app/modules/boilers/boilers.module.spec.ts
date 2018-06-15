import { BoilersModule } from './boilers.module';

describe('BoilersModule', () => {
  let boilersModule: BoilersModule;

  beforeEach(() => {
    boilersModule = new BoilersModule();
  });

  it('should create an instance', () => {
    expect(boilersModule).toBeTruthy();
  });
});

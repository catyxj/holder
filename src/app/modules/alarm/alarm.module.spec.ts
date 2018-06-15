import { AlarmModule } from './alarm.module';

describe('AlarmModule', () => {
  let alarmModule: AlarmModule;

  beforeEach(() => {
    alarmModule = new AlarmModule();
  });

  it('should create an instance', () => {
    expect(alarmModule).toBeTruthy();
  });
});

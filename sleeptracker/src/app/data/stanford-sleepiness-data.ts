/* from the Stanford Sleepiness Scale */
/* https://web.stanford.edu/~dement/sss.html */

import { SleepData } from './sleep-data';

export class StanfordSleepinessData extends SleepData {
  public static ScaleValues = [
    undefined, //Sleepiness scale starts at 1
    'Feeling active, vital, alert, or wide awake', //1
    'Functioning at high levels, but not at peak; able to concentrate', //2
    'Awake, but relaxed; responsive but not fully alert', //3
    'Somewhat foggy, let down', //4
    'Foggy; losing interest in remaining awake; slowed down', //5
    'Sleepy, woozy, fighting sleep; prefer to lie down', //6
    'No longer fighting sleep, sleep onset soon; having dream-like thoughts',
  ]; //7

  public static customValues = [
    'Feeling active, vital, alert, or wide awake', //1
    'Functioning at high levels, but not at peak', //2
    'Awake, but relaxed; not fully alert', //3
    'Somewhat foggy, let down', //4
    'Foggy; losing interest in remaining awake', //5
    'Sleepy, woozy; prefer to lie down', //6
    'Sleep onset soon; having dreamlike thoughts',
  ]; //7

  private loggedValue: number;
  private sleepyDate: Date;

  constructor(loggedValue: number, sleepyDate: Date) {
    super();
    this.loggedValue = loggedValue;
    this.sleepyDate = sleepyDate;
  }

  override timeString(): string {
    return (
      'Logged at ' +
      this.sleepyDate.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })
    );
  }

  override summaryString(): string {
    return 'Felt: ' + StanfordSleepinessData.ScaleValues[this.loggedValue];
  }

  override dateString(): string {
    return (
      'Sleepiness: ' +
      this.sleepyDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    );
  }

  override getDate() {
    return this.sleepyDate;
  }

  override getType() {
    return 'sleepiness';
  }

  getLoggedValue() {
    return this.loggedValue;
  }
}

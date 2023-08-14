import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
  private sleepStart: Date;
  private sleepEnd: Date;

  constructor(sleepStart: Date, sleepEnd: Date) {
    super();
    this.sleepStart = sleepStart;
    this.sleepEnd = sleepEnd;
  }

  override timeString(): string {
    return (
      'Slept from ' +
      this.sleepStart.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      }) +
      ' to ' +
      this.sleepEnd.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })
    );
  }

  override summaryString(): string {
    var sleepStart_ms = this.sleepStart.getTime();
    var sleepEnd_ms = this.sleepEnd.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = sleepEnd_ms - sleepStart_ms;

    // Convert to hours and minutes
    return (
      'for ' +
      Math.floor(difference_ms / (1000 * 60 * 60)) +
      ' hours, ' +
      Math.floor((difference_ms / (1000 * 60)) % 60) +
      ' minutes'
    );
  }

  override dateString(): string {
    return (
      'Night of ' +
      this.sleepStart.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    );
  }

  public getSleepStart() {
    return this.sleepStart;
  }

  override getDate() {
    return this.sleepEnd;
  }

  override getType() {
    return 'overnight';
  }
}

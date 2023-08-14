import { nanoid } from 'nanoid';

export class SleepData {
  id: string;
  loggedAt: Date;

  constructor() {
    //Assign a random (unique) ID. This may be useful for comparison (e.g., are two logged entries the same).
    this.id = nanoid();
    this.loggedAt = new Date();
  }

  timeString(): string {
    return new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  summaryString(): string {
    return 'Unknown sleep data';
  }

  dateString(): string {
    return this.loggedAt.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  }

  getDate() {
    return new Date();
  }

  getType() {
    return '';
  }
}

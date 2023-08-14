import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SleepService {
  private static LoadDefaultData: boolean = false;
  public static AllSleepData: SleepData[] = [];
  public static AllOvernightData: OvernightSleepData[] = [];
  public static AllSleepinessData: StanfordSleepinessData[] = [];

  constructor(private storage: Storage) {
    if (SleepService.LoadDefaultData) {
      this.addDefaultData();
      SleepService.LoadDefaultData = false;
    }
    storage.create();
    // storage.clear();
    this.loadData();
  }

  async loadData() {
    this.storage.forEach((item) => {
      // console.log(item);
      if (item.hasOwnProperty('sleepyDate')) {
        const sleepData = new StanfordSleepinessData(
          item.loggedValue,
          item.sleepyDate
        );
        SleepService.AllSleepinessData.push(sleepData);
        SleepService.AllSleepData.push(sleepData);
      } else {
        const sleepData = new OvernightSleepData(
          item.sleepStart,
          item.sleepEnd
        );
        SleepService.AllOvernightData.push(sleepData);
        SleepService.AllSleepData.push(sleepData);
      }
    });
  }

  //   private loadStorageData() {
  //     this.storage.get('AllSleepData').then((sleepData) => {
  //       if (sleepData) {
  //         SleepService.AllSleepData = sleepData;
  //         console.log('Previous sleep data loaded (all)');
  //       } else {
  //         console.log('Not loaded (all)');
  //       }
  //     });
  //     this.storageService.get('AllOvernightData').then((sleepData) => {
  //       if (sleepData) {
  //         SleepService.AllOvernightData = sleepData;
  //         console.log('Previous sleep data loaded (overnight)');
  //       } else {
  //         console.log('Not loaded (overnight)');
  //       }
  //     });
  //     this.storageService.get('AllSleepinessData').then((sleepData) => {
  //       if (sleepData) {
  //         SleepService.AllSleepinessData = sleepData;
  //         console.log('Previous sleep data loaded (sleepiness)');
  //       } else {
  //         console.log('Not loaded (sleepiness)');
  //       }
  //     });
  //     this.storageService.get('numbers').then((data) => {
  //       console.log(data);
  //     });
  //   }

  private addDefaultData() {
    this.logOvernightData(
      new OvernightSleepData(
        new Date('February 18, 2021 01:03:00'),
        new Date('February 18, 2021 09:25:00')
      )
    );
    this.logSleepinessData(
      new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00'))
    );
    this.logOvernightData(
      new OvernightSleepData(
        new Date('February 20, 2021 23:11:00'),
        new Date('February 21, 2021 08:03:00')
      )
    );
  }

  public logOvernightData(sleepData: OvernightSleepData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllOvernightData.push(sleepData);
    this.storage.set(sleepData.id, sleepData);
    // this.storage.set('AllSleepData', SleepService.AllSleepData);
    // this.storage.set('AllOvernightData', SleepService.AllOvernightData);

    // console.log('CURRENT SLEEP DATA');
    // console.log(SleepService.AllSleepData);
    // console.log('STORED SLEEP DATA');
    // this.storage.get('AllSleepData').then((data) => console.log(data));
  }

  public logSleepinessData(sleepData: StanfordSleepinessData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllSleepinessData.push(sleepData);
    this.storage.set(sleepData.id, sleepData);
    // this.storage.set('AllSleepData', SleepService.AllSleepData);
    // this.storage.set('AllSleepinessData', SleepService.AllSleepinessData);

    // console.log('CURRENT SLEEP DATA');
    // console.log(SleepService.AllSleepData);
    // console.log('STORED SLEEP DATA');
    // this.storage.get('AllSleepData').then((data) => console.log(data));
  }

  public clearLogs() {
    SleepService.AllSleepData = [];
    SleepService.AllOvernightData = [];
    SleepService.AllSleepinessData = [];
    this.storage.clear();
    console.log('Logs cleared');
  }
}

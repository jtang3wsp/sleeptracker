import { Component, OnInit } from '@angular/core';
import { SleepData } from 'src/app/data/sleep-data';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';
import { SleepService } from 'src/app/services/sleep.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  showOvernight = true;
  showSleepiness = true;

  constructor(private sleepService: SleepService) {}

  ngOnInit() {}

  sortSleepLogs() {
    return SleepService.AllSleepData.sort((a, b) => {
      if (a.getDate() < b.getDate()) return 1;
      if (a.getDate() > b.getDate()) return -1;
      return 0;
    });
  }

  clearLogs() {
    console.log('CLEARING SLEEP LOGS');
    this.sleepService.clearLogs();
  }
}

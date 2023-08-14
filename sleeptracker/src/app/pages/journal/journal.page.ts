import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SleepService } from 'src/app/services/sleep.service';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
})
export class JournalPage implements OnInit {
  sleepyDate = '';
  sleepyValue = null;
  options = StanfordSleepinessData.customValues;

  constructor(
    private sleepService: SleepService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const date = new Date();
    date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
    this.sleepyDate = date.toISOString();
  }

  async errorMessage() {
    const alert = await this.alertController.create({
      header: 'Please select an option.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async confirmationMessage() {
    const alert = await this.alertController.create({
      header: 'Sleepiness recorded!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  addRecord() {
    if (this.sleepyValue == null) {
      console.log('ERROR');
      this.errorMessage();
    } else {
      this.sleepService.logSleepinessData(
        new StanfordSleepinessData(this.sleepyValue, new Date(this.sleepyDate))
      );
      this.confirmationMessage();
      // console.log('Success');
    }
  }
}

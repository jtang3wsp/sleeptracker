import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { SleepService } from 'src/app/services/sleep.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.page.html',
  styleUrls: ['./sleep.page.scss'],
})
export class SleepPage implements OnInit {
  currentDate = new Date().toDateString();
  currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  sleepDate = '';
  //sleepTime = new Date().toISOString();
  wakeDate = '';
  //wakeTime = new Date().toISOString();

  constructor(
    private sleepService: SleepService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const date = new Date();
    date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
    this.sleepDate = date.toISOString();
    this.wakeDate = this.sleepDate;
    setInterval(() => {
      this.currentDate = new Date().toDateString();
      this.currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }, 1000);
  }

  async errorMessage() {
    const alert = await this.alertController.create({
      header: 'Please enter a valid time range.',
      message: '(Wake time must be later than sleep time)',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async confirmationMessage() {
    const alert = await this.alertController.create({
      header: 'Sleep recorded!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  addRecord() {
    const newSleepDate = new Date(this.sleepDate);
    const newWakeDate = new Date(this.wakeDate);
    if (newWakeDate <= newSleepDate) {
      console.log('ERROR');
      this.errorMessage();
    } else {
      this.sleepService.logOvernightData(
        new OvernightSleepData(newSleepDate, newWakeDate)
      );
      this.confirmationMessage();
      // console.log('Success');
    }
  }
}

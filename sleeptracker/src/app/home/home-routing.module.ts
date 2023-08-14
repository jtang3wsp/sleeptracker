import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'sleep',
        loadChildren: () =>
          import('../pages/sleep/sleep.module').then((m) => m.SleepPageModule),
      },
      {
        path: 'journal',
        loadChildren: () =>
          import('../pages/journal/journal.module').then(
            (m) => m.JournalPageModule
          ),
      },
      {
        path: 'history',
        loadChildren: () =>
          import('../pages/history/history.module').then(
            (m) => m.HistoryPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'sleep',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParkComponent } from './park.component';
import { CreateParkComponent } from './create-park/create-park.component';
import { ParkListComponent } from './park-list/park-list.component';
import { ParkStatisticComponent } from './park-statistic/park-statistic.component';
import { ParkStatusComponent } from './park-status/park-status.component';

const routes: Routes = [
  {
    path: '',
    component: ParkComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'statistic',
      },
      {
        path: 'statistic',
        pathMatch: 'full',
        component: ParkStatisticComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: CreateParkComponent,
      },
      {
        path: 'status',
        pathMatch: 'full',
        component: ParkStatusComponent,
      },
      {
        path: 'list',
        pathMatch: 'full',
        component: ParkListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParkComponent } from './park.component';
import { CreateParkComponent } from './create-park/create-park.component';
import { ParkListComponent } from './park-list/park-list.component';

const routes: Routes = [
  {
    path: '',
    component: ParkComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create',
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: CreateParkComponent,
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

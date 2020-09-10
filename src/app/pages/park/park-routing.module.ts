import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParkComponent } from './park.component';
import { CreateParkComponent } from './create-park/create-park.component';

const routes: Routes = [
  {
    path: '',
    component: ParkComponent,
    children: [
      {
        path: '',
        component: CreateParkComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkRoutingModule {}

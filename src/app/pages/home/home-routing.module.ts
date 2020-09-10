import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'park' },
      {
        path: 'park',
        pathMatch: 'full',
        loadChildren: () =>
          import('../park/park.module').then((m) => m.ParkModule),
      },
      {
        path: 'card',
        pathMatch: 'full',
        loadChildren: () =>
          import('../card/card.module').then((m) => m.CardModule),
      },
      {
        path: 'user',
        pathMatch: 'full',
        loadChildren: () =>
          import('../user/user.module').then((m) => m.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

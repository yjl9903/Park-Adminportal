import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './card.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CardListComponent } from './card-list/card-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create',
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: CreateCardComponent,
      },
      {
        path: 'list',
        pathMatch: 'full',
        component: CardListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardRoutingModule {}

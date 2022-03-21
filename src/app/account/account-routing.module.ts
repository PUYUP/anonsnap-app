import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPage } from './account.page';
import { CommentComponent } from './components/comment/comment.component';
import { MomentComponent } from './components/moment/moment.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'moment',
        component: MomentComponent,
      },
      {
        path: 'comment',
        component: CommentComponent,
      },
      {
        path: '',
        component: AccountPage,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountPageRoutingModule {}

import { TransactionFormComponent } from './transaction/transaction-form/transaction-form.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';


const routes: Routes = [
  {
    path: '',
    component: UserLoginComponent
  },
  {
    path: 'user/new',
    component: UserFormComponent
  },
  {
    path: 'transaction',
    component: TransactionListComponent
  },
  {
    path: 'transaction/new',
    component: TransactionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

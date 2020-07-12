import { TransactionService } from './../transaction.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  trans : any = []
  balance: any

  displayedColumns : string[] = ["type", "amount", "balanceAfterTransaction", "date"]

  constructor(
    private tranSrv: TransactionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  async ngOnInit(){
    let idUser = window.localStorage.getItem('idUser');
    if(idUser){
      this.trans = await this.tranSrv.getByUser(idUser);
      this.balance = await this.tranSrv.getBalance(idUser);
    }else{
      this.snackBar.open('You are not logged in!', 'Ok', { duration: 5000 });
      this.router.navigate([''])
    }
  }

  logOut(){
    if(confirm("Are you sure to log out?")){
      window.localStorage.removeItem('idUser');
      this.router.navigate([''])
    }
  }

}

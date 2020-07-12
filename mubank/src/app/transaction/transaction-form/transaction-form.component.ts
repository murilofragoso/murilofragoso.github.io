import { TransactionService } from './../transaction.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  tran: any = {};
  balance: any;
  types: any = [
    {value: "W", viewValue: "Withdraw"},
    {value: "D", viewValue: "Deposit"}
  ]

  constructor(
    private tranSrv: TransactionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  async ngOnInit() {
    let idUser = window.localStorage.getItem('idUser');
    if(idUser){
      this.tran.user = idUser;
      this.balance = await this.tranSrv.getBalance(idUser);
    }else{
      this.snackBar.open('You are not logged in!', 'Ok', { duration: 5000 });
      this.router.navigate([''])
    }
  }

  async new(form: NgForm){
    if(form.valid){
      try{

        await this.tranSrv.new(this.tran)
        
        this.snackBar.open('Transaction complete!', 'Ok', {duration: 5000});
        
        this.router.navigate(['/transaction'])
      }
      catch(error){
        console.log(this.tran);
        console.log(error)
        this.snackBar.open(error.error, 'Ok',  {duration: 5000})
      }
    }
  }

}

import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  user: any = {}

  constructor(
    private userSrv: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    //if already logged in, redirect to transaction list
    let idUser = window.localStorage.getItem('idUser');
    if(idUser)
      this.router.navigate(['/transaction'])
  }

  async login(form: NgForm){
    if(form.valid){
      try{

        let idUser = await this.userSrv.login(this.user)

        window.localStorage.setItem('idUser', idUser.toString());
        
        this.snackBar.open('Successfully logged in!', 'Ok', {duration: 5000});
        this.router.navigate(['/transaction'])
      }
      catch(error){
        console.log(this.user);
        console.log(error)
        this.snackBar.open(error.error, 'Ok',  {duration: 5000})
      }
    }
  }

}

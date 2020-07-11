import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  user: any = {}
  
  constructor(
    private userSrv: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async signUp(form: NgForm){
    if(form.valid){
      try{

        await this.userSrv.new(this.user)
        
        this.snackBar.open('Registered successfully!', 'Ok', {duration: 5000});
        
        this.router.navigate(['/'])
      }
      catch(error){
        console.log(this.user);
        console.log(error)
        this.snackBar.open(error.error, 'Ok',  {duration: 5000})
      }
    }
  }

}

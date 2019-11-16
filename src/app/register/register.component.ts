import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private Auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registerUser(e) {
    e.preventDefault();
    const target = e.target;
    const errors = [];
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    const cpassword = target.querySelector('#cpassword').value;
    
    // validation 
    if(password != cpassword) {
      errors.push("Confirmação da palavra-passe falhou...")
    }

    if(errors.length === 0){
      this.Auth.registerUser(email, password).subscribe(data => {
        console.log(data);
        if(data.success) {
          this.router.navigate(['dashboard']);
        }
      })
    }
    //console.log(username, password);
  }

}

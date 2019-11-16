import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService, private router: Router) { }
  error = ''
  ngOnInit() {
  }

  loginUser(e) {
    e.preventDefault();
    const target = e.target;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    
    this.Auth.getUserDetails(email, password).subscribe(data => {
      if(data.success) {
        this.router.navigate(['dashboard'])
        this.Auth.setLoggedIn(true);
      }else if(email == '' || password == '') {
        this.error = 'Prencha todos os campos por favor...'
      }else {
        this.error = 'Credenciais erradas.'
      }
    });
    //console.log(username, password);
  }

}

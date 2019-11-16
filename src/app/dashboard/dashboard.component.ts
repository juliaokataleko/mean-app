import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message = "Carregando dados..."
  quote = "Loading your personal quote...";
  email = "Loading your email...";
  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.user.getData().subscribe(data => {
      if(data.status) {
        this.quote = data.quote
        this.email = data.email
      } else {
        this.router.navigate(['logout'])
      }
      
    })
  }

  updateQuote(e) {
    const value = e.target.parentNode.querySelector('#myQuote').value;
    this.user.updateQuote(value).subscribe(data => {
      if(data.success) {
        alert("Sua frase foi actualizada")
      } else {
        alert("Algo correu mal...")
      }
    })
  }

}

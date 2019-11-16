import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  message = "Carregando dados..."

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.getData().subscribe(data => {
      this.message = data.quote
      if(!data.status) {
        localStorage.removeItem('loggedIn');
      }
    })
  }

}

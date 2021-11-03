import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuarios: string[]=['admin', 'admin123'];
  

  constructor() { 
    console.log(this.usuarios)
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuarios: string[] = ['admin', 'admin123'];
  msjProceso: boolean = false;

  msjSesion: string = "Inicio correcto";

  usuario: string = "";
  password: string = "";
  

  constructor() {
  }

  ngOnInit(): void {
  }


  login() {

    this.msjProceso=true;
    if(this.usuario !== this.usuarios[0] || this.password !== this.usuarios[1]){
      this.msjSesion="Inicio de sesion incorrecto";
    }else{
      this.msjSesion="Inicio correcto";
    }
    console.log(this.usuario)
    console.log(this.password)
  }


}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuarios: string[] = ['admin', 'prueba'];
  private claves: string[] = ['admin123', '123'];
  msjProceso: boolean = false;

  msjSesion: string = "Inicio correcto";

  usuario: string = "";
  password: string = "";

  log: boolean = true;
  

  constructor() {
  }

  ngOnInit(): void {
  }


  login() {

    this.msjProceso=true;
    for ( let i=0; i<this.usuarios.length; i++)
    {
      if(this.usuario == this.usuarios[i] && this.password == this.claves[i]){
        this.log=true;
        break;
      }
      else{
        this.log=false;
      }
    }
    if(!this.log){
      this.msjSesion="Inicio de sesion incorrecto";
    }else{
      this.msjSesion="Inicio correcto";
    }
    console.log(this.usuario)
    console.log(this.password)
    console.log(this.usuarios.length)
  }


}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuarios: string[] = ['admin', 'admin123'];
  private usuariosls: any[] = [
    ['admin', 'admin123'],
    ['admin2', 'admin3'],
    ['admin3', 'admin2'],
    ['admin4', 'admin13'],
    ['admin5', 'admin321']
  ];
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

    
    
    this.msjProceso = true;
    for (let p of this.usuariosls) {
      
      let local: boolean = false;
      if (this.usuario !== p[0] || this.password !== p[1]) {
        this.msjSesion = "Inicio de sesion incorrecto";
        local = false;
      } else {
        local = true;
        this.msjSesion = "Inicio correcto";
        this.log = local;
        break;
      }
      this.log = local;
      
    }
    

    // if (this.usuario !== this.usuarios[0] || this.password !== this.usuarios[1]) {
    //   this.msjSesion = "Inicio de sesion incorrecto";
    //   this.log = false;
    // } else {
    //   this.log = true;
    //   this.msjSesion = "Inicio correcto";
    // }
    // console.log(this.usuario)
    // console.log(this.password)
  }


}

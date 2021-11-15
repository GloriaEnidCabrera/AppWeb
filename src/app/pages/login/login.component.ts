import { Component, OnInit } from '@angular/core';
import { Acceso } from '../../acceso';
import { ACCESOS } from '../../mock-acceso';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioInicial: Acceso = {
    user: 'admininicial',
    password: 'admin123456'
  };

  accesos = ACCESOS;
  usuario: string = "";
  password: string = "";

  log: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  msjInicioSesion: string = "";
  msjProceso: number = -1;
  login() {

    for (let acceso of this.accesos) {
      console.log(acceso)

      if (this.usuario == "" || this.password == "") {
        this.msjProceso = 9;
      } else {
        if (this.usuario === acceso.user) {
          this.msjProceso = 1;
          console.log('usuario OK')
          if (this.password === acceso.password) {
            this.msjProceso = 1;
            console.log('password OK')
            break;
          } else {
            this.msjProceso = 0;
          }
        } else {
          this.msjProceso = 0;
        }
      }
    }
  }

}

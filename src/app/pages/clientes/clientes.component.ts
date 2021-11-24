import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from './client.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  flag_us: boolean = false;
  flag_name: boolean = false;
  flag_ps: boolean = false;
  flag_email: boolean = false;
  flag_table: boolean = false;

  crud!: String;

  email = "";
  name = "";
  password = "";
  username = "";

  usuarios!: any;


  constructor(private cabecera: ActivatedRoute, private peticiones: ClientService) {
    this.cabecera.params.subscribe(params => {
      this.crud = params['crud'];

      switch (this.crud) {
        case "create": case "update":
          this.flag_us = true;
          this.flag_name = true;
          this.flag_ps = true;
          this.flag_email = true;
          this.flag_table = false;
          break;
          case "read": case "delete":
            this.flag_us = true;
            this.flag_name = false;
            this.flag_ps = false;
            this.flag_email = false;
            this.flag_table = false;
          break;
            
      }

    });
  }

  ngOnInit(): void { }


  clic() {
    let body = {
      "email": this.email,
      "nombre_completo": this.name,
      "password": this.password,
      "username": this.username
    }
    switch (this.crud) {
      case "create":
        this.peticiones.crear(body).subscribe(data => {
          console.log(body);
          console.log(data);
        });
        break;
      case "read":
        // this.peticiones.buscar(this.username).subscribe(data => {
        this.peticiones.buscarTodos().subscribe(data => {
          console.log(data);
          this.usuarios = data;
          this.flag_table = true;


        });
        break;
      case "update":
        this.peticiones.actualizar(body).subscribe(data => {
          console.log(data);
        });
        break;
      case "delete":
        this.peticiones.borrar(this.username).subscribe(data => {
          console.log(data);
        });
        break;
      default:
        break;
    }
  }

}

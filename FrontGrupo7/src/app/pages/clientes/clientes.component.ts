import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ObjectUnsubscribedError } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';
import { Data } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  resp: any;
  contenido: any;
  // API url
  baseApiUrl = "http://localhost:8080/api/clientes";


  constructor(private Objethttp: HttpClient) { }
  //Opciones y objeto revisor de la tabla
  //dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  //camposModulo
  cedula!: number;
  nombre!: string;
  correo!: string;
  direc!: string;
  tele!: number;

  codigoRespuesta!: number;
  data!: any;

  ngOnInit() {
    this.resp = this.Objethttp.get(this.baseApiUrl);
    this.resp.subscribe((dato: any[]) => {
      this.contenido = dato;
      console.log(this.contenido)
    }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  //POST

  postData() {
    this.Objethttp.post<any>(this.baseApiUrl,
      {
        "cedulaCliente": this.cedula,
        "nombreCliente": this.nombre,
        "correoElectronicoCliente": this.correo,
        "direccionCliente": this.direc,
        "telefonoCliente": this.tele
      }, { observe: 'response' }
    ).subscribe(response => {
      this.codigoRespuesta = response.status;
    });

  }
  //GET
  getClientes() {
    this.resp = this.Objethttp.get(this.baseApiUrl).pipe(catchError(this.handleError));

  }
  getData(): void {
    this.data = this.Objethttp.get(this.baseApiUrl)
      .subscribe(
        data => {
          this.contenido = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  //DELETE


handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido!';
    if (error.error instanceof ErrorEvent) {
      // Errores del lado del cliente
      errorMessage = `Error: ${error.error.message}\n ${error.status}`;
    } else {
      // Errores del lado del servidor
      errorMessage = `Codigo de Error: ${error.status} \nMensaje: ${error.message}`;
    }
    //MOSTRANDO UN ERROR EN UNA ALERTA
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

  /*deleteData() {
    this.Objethttp.getElementById<any>(this.baseApiUrl);
    this.resp.subscribe((dato: cedula) => {
      this.contenido = dato;
      console.log(this.contenido)

    }
    );/
  }
            }
      }
*/
}

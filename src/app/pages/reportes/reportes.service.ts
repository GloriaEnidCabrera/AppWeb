import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private httpClient:HttpClient) {

  }
  /*getcliente(){
    return this.httpClient.get(http://localhost:8080/api/clientes")
  }

  //body clientes
  cliente = {
    "cedulaCliente": "",
    "correoElectronicoCliente": "",
    "direccionCliente": "",
    "id": "",
    "nombreCliente": "",
    "telefonoCliente": ""
  }*/


}

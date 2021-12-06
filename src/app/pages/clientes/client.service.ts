import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  
  export class ClientService {
  
    //API Url
    urlapiCliente: string = "http://localhost:8080/api/clientes";

    //inicializando objeto http
    constructor(private objetohttp: HttpClient) { }

    //Peticion Get Clientes (Read)
    getClientes(){
      return this.objetohttp.get(this.urlapiCliente,{observe:'response'});
    }
    //Peticion Get Cliente por cedula (Read)
    getClienteCedula(cedulaCliente:number){
      return this.objetohttp.get(this.urlapiCliente+`=${cedulaCliente}`,{observe:'response'});
    }
    //Peticion Post Clientes (Create)
    postCliente(body:any){
      return this.objetohttp.post(this.urlapiCliente, body,{observe:'response'}); 
    }
    //Peticion Put Clientes (Update)
    putCliente(cedulaCliente:number, body:any){
      return this.objetohttp.put(this.urlapiCliente+`/${cedulaCliente}`, body,{observe:'response'});
      
    }
    //Peticion Delete Clientes (Delete)
    deleteCliente(cedulaCliente:number){
      return this.objetohttp.delete(this.urlapiCliente+`/${cedulaCliente}`,{observe:'response'});
      
    }
  }
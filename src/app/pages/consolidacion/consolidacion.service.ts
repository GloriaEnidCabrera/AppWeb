import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsolidacionService {

  //API Url
  urlapi_cbase: string = "http://localhost:8080/api/consolidados";

  constructor(private http: HttpClient) { }
      //Peticion Get Clientes (Read)
      getConsolidados(){
        return this.http.get(this.urlapi_cbase,{observe:'response'});
      }
      //Peticion Get Cliente por cedula (Read)
      getConsolidadoCiudad(ciudad:string){
        return this.http.get(this.urlapi_cbase+`=${ciudad}`,{observe:'response'});
      }
      //Peticion Post Clientes (Create)
      postConsolidado(body:any){
        return this.http.post(this.urlapi_cbase, body,{observe:'response'});
      }

}

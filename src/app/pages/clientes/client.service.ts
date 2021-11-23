import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url: string = 'http://localhost:8080/api/usuarios'
  constructor(private http: HttpClient) { }


buscar(username:string){
  return this.http.get(this.url+`/${username}`);
}

buscarTodos(){
  return this.http.get(this.url);
  
}

crear(body:any){
  return this.http.post(this.url, body);
  
}

actualizar(body:any){
  return this.http.post(this.url, body);
  
}

borrar(id:any){
  return this.http.delete(this.url+`/${id}`);
  
}

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class VentasService {
  URL: string = 'http://localhost:8080/api/productos/code/';
  URL_VENTA: string = 'http://localhost:8080/api/ventas'
 URL_CONS: string =  'http://localhost:8080/api/consolidados/add/'
  constructor(private http: HttpClient) { }

  //Obtener cliente por
  getProductoByCode(code: number) {
    console.log(`${this.URL}${code}`);
    return this.http.get(`${this.URL}${code}`, {observe:'response'});
  }
  saveSale(sale: any) {
    return this.http.post(`${this.URL_VENTA}`, sale, {observe:'response'});
  }
  getVentaConsecutivo(){
    return this.http.get(`http://localhost:8080/api/ventas/consecutivo`);
  }

  getSale() {
    return this.http.get(this.URL_VENTA,{observe:'response'});
  }

  postconsolidado(ciudad: any){
    return this.http.post(this.URL_CONS+ciudad, {observe:'response'});
  }
}

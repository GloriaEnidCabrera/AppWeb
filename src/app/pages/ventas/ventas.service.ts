import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VentasService {


  URL: string = 'http://localhost:8080/api/productos/code/';
  URL_VENTA: string = 'http://localhost:8080/api/ventas'

  constructor(private http: HttpClient) { }

  //Obtener cliente por
  getProductoByCode(code: number) {
    console.log(`${this.URL}${code}`);
    return this.http.get(`${this.URL}${code}`);
  }

  saveSale(sale: object) {
    return this.http.post(`${this.URL_VENTA}`, sale);
  }



}
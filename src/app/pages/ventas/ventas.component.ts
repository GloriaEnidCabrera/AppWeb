import { Component, OnInit } from '@angular/core';
import { ClientService } from '../clientes/client.service';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  //Variable

  //Campos Modulo Ventas
  cedulaCliente!: number;

  //variable contenedora de contenidos
  contenido: any;

  //Constructor para solicitudes
  constructor(private ClientService: ClientService) { }

  ngOnInit(): void {
  }

  getCliente() {
    this.ClientService.getClienteCedula(this.cedulaCliente).subscribe(data => {
      this.contenido = data;
      console.log(data);
    });
  }

  getProducto() {
    
  }
}

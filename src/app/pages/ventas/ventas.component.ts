import { Component, OnInit } from '@angular/core';
import { ClientService } from '../clientes/client.service';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { VentasService } from './ventas.service';
import { ComponentFixture } from '@angular/core/testing';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  //Campos Modulo Ventas
  products = [{
    "codigoproducto": "",
    "ivacompra": 0,
    "nitproveedor": "",
    "nombreproducto": "",
    "preciocompra": "",
    "precioventa": 0
  },
  {
    "codigoproducto": "",
    "ivacompra": 0,
    "nitproveedor": "",
    "nombreproducto": "",
    "preciocompra": "",
    "precioventa": 0
  },
  {
    "codigoproducto": "",
    "ivacompra": 0,
    "nitproveedor": "",
    "nombreproducto": "",
    "preciocompra": "",
    "precioventa": 0
  }]

  //Variable
  consecutivo!: string;
  cantidad = [0, 0, 0];

  // dis = "disabled";
  totalventa: number = 0;
  cliente = {
    "cedulaCliente": "",
    "correoElectronicoCliente": "",
    "direccionCliente": "",
    "id": "",
    "nombreCliente": "",
    "telefonoCliente": ""
  }
  //variable contenedora de contenidos
  contenido: any;

  //Constructor para solicitudes
  constructor(private peticionesCliente: ClientService, private ventasPeticiones: VentasService) { }

  ngOnInit(): void {
  }

  prueba() {
    console.log(this.cliente.cedulaCliente.length);
  }

  getCliente() {
    let ll = this.peticionesCliente.getClienteCedula(1018511576);
    ll.subscribe(
      (response: any) => {
        console.log(response.body);
        this.cliente = response.body[0];
        this.consecutivo = this.cliente.id;
      }
    )
  }

  getProductoByCode(product: number, code: any) {
    let pp = this.ventasPeticiones.getProductoByCode(code);
    pp.subscribe((response: any) => {
      this.products[product] = {
        "codigoproducto": response.codigoproducto,
        "ivacompra": response.ivacompra,
        "nitproveedor": response.nitproveedor,
        "nombreproducto": response.nombreproducto,
        "preciocompra": response.preciocompra,
        "precioventa": response.precioventa
      };
      console.log(this.products[product]);
    });

  }


  confirmarVenta() {
    let listProduct = this.products.filter(product => product.nombreproducto !== "");
    let iva = 0;
    let totVenta = 0;
    listProduct.forEach(product => {
      iva += (product.ivacompra / 100) * product.precioventa;
      totVenta += product.precioventa;
    })

    for (let i in listProduct) {
      iva += (listProduct[i].ivacompra / 100) * listProduct[i].precioventa * this.cantidad[i];
      totVenta += listProduct[i].precioventa * this.cantidad[i];
    }

    let detalles = [];

    for (let i in listProduct) {

      detalles.push({
        "cantidadproducto": this.cantidad[i],
        "codigoproducto": listProduct[i].codigoproducto,
        "valoriva": listProduct[i].ivacompra,
        "valortotal": listProduct[i].precioventa*this.cantidad[i]+(listProduct[i].ivacompra/100)*listProduct[i].precioventa,
        "valorventa": listProduct[i].precioventa
      })
    }

    let venta = {
      "cedulaCliente": this.cliente.cedulaCliente,
      "codigoventa": 0,
      "detalleventa": detalles,
      "ivaventa": iva,
      "totalventa": totVenta,
      "valorventa": iva + totVenta
    }

    console.log(venta);

    let save = this.ventasPeticiones.saveSale(venta);
    save.subscribe(response => console.log(response));
  }


}




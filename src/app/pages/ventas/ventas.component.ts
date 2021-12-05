import { Component, OnInit } from '@angular/core';
import { ClientService } from '../clientes/client.service';
import { VentasService } from './ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {


  //Campos Modulo Ventas
  products = [{
    "codigoproducto": 0,
    "ivacompra": 0,
    "nitproveedor": "",
    "nombreproducto": "",
    "preciocompra": 0,
    "precioventa": 0
  },
  {
    "codigoproducto": 0,
    "ivacompra": 0,
    "nitproveedor": "",
    "nombreproducto": "",
    "preciocompra": 0,
    "precioventa": 0
  },
  {
    "codigoproducto": 0,
    "ivacompra": 0,
    "nitproveedor": "",
    "nombreproducto": "",
    "preciocompra": 0,
    "precioventa": 0
  }]

  

  //Variable
  consecutivo!: string;
  cantidad = [0, 0, 0];
  // cantidad!: number[];

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

  totales = {
    "tIva": 0,
    "tVenta": 0,
    "tTotal": 0

  }

  ngOnInit(): void {
  }



  getCliente() {
    let cedula = parseInt(this.cliente.cedulaCliente);
    let ll = this.peticionesCliente.getClienteCedula(cedula);
    ll.subscribe(
      (response: any) => {
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
     
    });


  }


  updateTotal() {
    let listProduct = this.products.filter(product => product.nombreproducto !== "");

    this.totales = { "tIva": 0, "tVenta": 0, "tTotal": 0 }

    for (let i in listProduct) {
      this.totales.tVenta += listProduct[i].precioventa * this.cantidad[i];
      this.totales.tIva += (listProduct[i].precioventa * (this.cantidad[i])) * (listProduct[i].ivacompra / 100);
      this.totales.tTotal = this.totales.tVenta + this.totales.tIva

    }

    this.totales.tVenta = Math.round(this.totales.tVenta);
    this.totales.tIva = Math.round(this.totales.tIva);
    this.totales.tTotal = Math.round(this.totales.tTotal);

  }

  confirmarVenta() {
    let listProduct = this.products.filter(product => product.nombreproducto !== "");

    let detalles = [];

    for (let i in listProduct) {

      let valIva = (listProduct[i].ivacompra / 100) * listProduct[i].precioventa * this.cantidad[i];
      let valVenta = (listProduct[i].precioventa * (this.cantidad[i]));
      let valTotal = valIva + valVenta;

      detalles.push({
        "cantidadproducto": this.cantidad[i],
        "codigoproducto": listProduct[i].codigoproducto,
        "valoriva": valIva,
        "valortotal": valTotal,
        "valorventa": valVenta
      })
    }

    let venta = {
      "cedulaCliente": this.cliente.cedulaCliente,
      "codigoventa": 0,
      "detalleventa": detalles,
      "ivaventa": this.totales.tIva,
      "totalventa": this.totales.tTotal,
      "valorventa": this.totales.tVenta
    }


    let save = this.ventasPeticiones.saveSale(venta);
  }


}




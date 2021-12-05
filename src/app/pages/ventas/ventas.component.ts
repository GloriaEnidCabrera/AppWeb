import { Component, OnInit } from '@angular/core';
import { ClientService } from '../clientes/client.service';
import { VentasService } from './ventas.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private peticionesCliente: ClientService, private ventasPeticiones: VentasService,
    private toastr: ToastrService) { }

  totales = {
    "tIva": 0,
    "tVenta": 0,
    "tTotal": 0
  }

  ngOnInit(): void {
  }


  codeget!: number;
  getCliente() {
    let cedula = parseInt(this.cliente.cedulaCliente);
    let ll = this.peticionesCliente.getClienteCedula(cedula);
    ll.subscribe(
      (response: any) => {
        console.log(response);
        this.codeget = response.status;
        console.log(this.codeget);

        switch (this.codeget) {
          case 200:
            this.showNotification('top', 'right', 7);
            this.cliente = response.body[0];
            this.consecutivo = this.cliente.id;
            break;

          case 204:
            this.showNotification('top', 'right', 8);
            break;

          case 404:
            this.showNotification('top', 'right', 9);
            break;
        }
      });
  }

  test!: string;
  codegetproducto!: number;
  getProductoByCode(product: number, code: any) {
    let pp = this.ventasPeticiones.getProductoByCode(code);
    pp.subscribe((response: any) => {
      console.log(response);
      this.codegetproducto = response.status;
      //test
      //this.test=response.body.codigoproducto;
      console.log(this.codegetproducto);

      switch (this.codegetproducto) {
        case 200:
          this.showNotification('top', 'right', 4);
          this.products[product] = {
            "codigoproducto": response.body.codigoproducto,
            "ivacompra": response.body.ivacompra,
            "nitproveedor": response.body.nitproveedor,
            "nombreproducto": response.body.nombreproducto,
            "preciocompra": response.body.preciocompra,
            "precioventa": response.body.precioventa
          };
          break;

        case 204:
          this.showNotification('top', 'right', 5);
          break;

        case 500:
          this.showNotification('top', 'right', 6);
          break;
      }
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

  codeventa!: number;
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
      "codigoventa": 102,
      "detalleventa": detalles,
      "ivaventa": this.totales.tIva,
      "totalventa": this.totales.tTotal,
      "valorventa": this.totales.tVenta
    }


    let save = this.ventasPeticiones.saveSale(venta);
    //save.subscribe(a=> console.log(a));
    save.subscribe((response: any) => {

      console.log(response);
      this.codeventa = response.status;

      switch (this.codeventa) {
        case 201:
          this.showNotification('top', 'right', 1);
          break;

        case 204:
          this.showNotification('top', 'right', 2);
          break;

        case 226:
          this.showNotification('top', 'right', 10);
          break;

        case 404:
          this.showNotification('top', 'right', 3);
          break;
      }
    });

  }


  //Notificaciones
  showNotification(from: string, align: string, type: number) {
    switch (type) {
      case 1:
        this.toastr.success('Venta añadida', '', {
          disableTimeOut: false,
          enableHtml: true,
          closeButton: true,
          //toastClass: 'alert alert-danger alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 2:
        this.toastr.warning('No se encuentra la venta', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          //toastClass: 'alert alert-success alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 3:
        this.toastr.error('Error en el servidor', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          //toastClass: 'alert alert-success alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 4:
        this.toastr.success('Producto encontrado', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 5:
        this.toastr.warning('Producto no encontrado, verifique que el código exista', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          positionClass: 'toast-' + from + '-' + align
        });
        break;

      case 6:
        this.toastr.error('Error en el servidor', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 7:
        this.toastr.success('Cliente en base de datos', 'Correcto', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 8:
        this.toastr.warning('Por favor, verifique el número de cédula', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 9:
        this.toastr.error('Error en el servidor', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 10:
        this.toastr.error('Se está duplicando el consecutivo', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      default:
        break;
    }
  }
}




import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { ClientService } from './client.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/clientes/read', title: 'Consultar', icon: 'fa-search', class: '' },
  { path: '/clientes/create', title: 'Crear', icon: 'fa-user-plus', class: '' },
  { path: '/clientes/update', title: 'Actualizar', icon: 'fa-user-edit', class: '' },
  { path: '/clientes/delete', title: 'Borrar', icon: 'fa-user-times', class: '' }
];

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnDestroy, OnInit {
  menuCrud: any[] | undefined;
  //control campos formulario
  flag_cedula: boolean = false;
  flag_telefono: boolean = false;
  flag_nombre: boolean = false;
  flag_email: boolean = false;
  flag_direccion: boolean = false;
  flag_table: boolean = true;
  //variable crud
  crud!: String;
  //Opciones y objeto revisor de la tabla
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  //camposModulo
  cedulaCliente: string = "";
  telephoneCliente: string = "";
  nameCliente: string = "";
  emailCliente: string = "";
  adressCliente: string = "";

  msjProceso: number = -1;
  //variable contenedora de contenidos
  contenido: any;
  res: any;

  //Constructor para solicitudes
  constructor(private cabecera: ActivatedRoute, private peticiones: ClientService,
    private toastr: ToastrService) {
    this.cabecera.params.subscribe(params => {
      this.crud = params['crud'];

      switch (this.crud) {
        case "create": case "update":
          this.flag_cedula = true;
          this.flag_telefono = true;
          this.flag_nombre = true;
          this.flag_email = true;
          this.flag_direccion = true;
          this.flag_table = true;
          break;
        case "read": case "delete":
          this.flag_cedula = true;
          this.flag_telefono = false;
          this.flag_nombre = false;
          this.flag_email = false;
          this.flag_direccion = false;
          this.flag_table = true;
          break;
      }
    });
  }

  //FUNCIÓN DE CONTROL DE ERRORES
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido!';
    if (error.error instanceof ErrorEvent) {
      // Errores del lado del cliente
      errorMessage = `Error: ${error.error.message}\n ${error.status}`;
    } else {
      // Errores del lado del servidor
      errorMessage = `Codigo de Error: ${error.status} \nMensaje: ${error.message}`;
    }
    //MOSTRANDO UN ERROR EN UNA ALERTA
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

  //INICIO METODO ANGULAR DATATABLE
  ngOnInit(): void {
    this.menuCrud = ROUTES.filter(menuCrud => menuCrud);

    console.log(this.cedulaCliente);

    try {
      this.res = this.peticiones.getClientes();
      this.res.subscribe(
        (response: any) => {
        this.contenido = response.body;
        console.log(this.contenido);
        this.dtTrigger.next(this.dtOptions);
      });
    } catch (e) {
      console.error("BK DOWN")
      this.contenido = []      
    }

    //Opciones especiales de la tabla, localización y caracteristicas
    this.dtOptions = {
      pagingType: 'full_numbers',
      columns: [/*{
        //title: 'ID',
      //},*/ {
        title: 'Cedula',
      }, {
        title: 'Nombre',
      }, {
        title: 'Direccion',
      }, {
        title: 'Telefono',
      }, {
        title: 'Correo',
      }],
      pageLength: 10,
      responsive: true,
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ elementos",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      }
    };
  }
  //eliminando objeto revisor de cambios de la tabla
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  //FIN METODO ANGULAR DATATABLE

  //FuncionClick
  codeget!: number;
  codepost!: number;
  codedelete!: number;
  codeput!: number;
  clic() {
    let body = {
      "cedulaCliente": this.cedulaCliente,
      "correoElectronicoCliente": this.emailCliente,
      "direccionCliente": this.adressCliente,
      "nombreCliente": this.nameCliente,
      "telefonoCliente": this.telephoneCliente
    }
    switch (this.crud) {
      case "create":
        this.peticiones.postCliente(body).subscribe(
          (response: any) => {

            console.log(response);
            this.codepost = response.status;

            switch (this.codepost) {
              case 201:
                this.showNotification('top', 'right', 1);
                break;

              case 226:
                this.showNotification('top', 'right', 2);
                break;

              case 500:
                this.showNotification('top', 'right', 3);
                break;
            }
            this.cedulaCliente = "";
            this.adressCliente = "";
            this.emailCliente = "";
            this.nameCliente = "";
            this.telephoneCliente = "";
            console.log(body);
            //this.dtTrigger.next(this.dtOptions);
          });
        break;

      case "read":
        //this.flag_table = true;
        this.peticiones.getClienteCedula(Number(this.cedulaCliente)).subscribe(
          (response: any) => {

            console.log(response);
            //this.contenido = response.body;
            this.codeput = response.status;
            //this.dtTrigger.next(this.dtOptions);

            switch (this.codeput) {
              case 200:
                this.showNotification('top', 'right', 9);
                break;

              case 204:
                this.showNotification('top', 'right', 11);
                break;

              case 404:
                this.showNotification('top', 'right', 10);
                break;
            }
            //this.cedulaCliente = "";
          });
        break;
      case "update":
        this.peticiones.putCliente(Number(this.cedulaCliente), body).subscribe(
          (response: any) => {

            console.log(response);
            this.codeput = response.status;

            switch (this.codeput) {
              case 200:
                this.showNotification('top', 'right', 6);
                break;

              case 224:
                this.showNotification('top', 'right', 7);
                break;

              case 500:
                this.showNotification('top', 'right', 8);
                break;
            }
            this.cedulaCliente = "";
            this.adressCliente = "";
            this.emailCliente = "";
            this.nameCliente = "";
            this.telephoneCliente = "";
            console.log(body);
            //this.dtTrigger.next(this.dtOptions);
          });
        break;
      case "delete":
        this.peticiones.deleteCliente(Number(this.cedulaCliente)).subscribe(
          (response: any) => {


            console.log(response);
            this.codedelete = response.status;

            switch (this.codedelete) {
              case 200:
                this.showNotification('top', 'right', 4);
                break;

              case 500:
                this.showNotification('top', 'right', 5);
                break;
            }
            this.cedulaCliente = "";
            //this.dtTrigger.next(this.dtOptions);
          });
        break;
    }
  }

  //Notificaciones
  showNotification(from: string, align: string, type: number) {
    switch (type) {
      case 1:
        this.toastr.success('Dato creado con exito', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          //toastClass: 'alert alert-success alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 2:
        this.toastr.warning('La cédula ya se encuentra registrada', '', {
          disableTimeOut: false,
          enableHtml: true,
          closeButton: true,
          //toastClass: 'alert alert-danger alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 3:
        this.toastr.error('Error Back', '', {
          disableTimeOut: false,
          enableHtml: true,
          closeButton: true,
          //toastClass: 'alert alert-danger alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 4:
        this.toastr.success('Dato eliminado con exito', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          //toastClass: 'alert alert-success alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 5:
        this.toastr.error('Error al eliminar el dato', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          //toastClass: 'alert alert-success alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 6:
        this.toastr.success('Dato actualizado con exito', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          //toastClass: 'alert alert-success alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 7:
        this.toastr.warning('Error al actualizar dato, verifique que el dato exista', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          //toastClass: 'alert alert-success alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;

      case 8:
        this.toastr.error('Error en el servidor', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          //toastClass: 'alert alert-success alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 9:
        this.toastr.success('Cliente en base de datos', 'Correcto', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          //toastClass: 'alert alert-danger alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 10:
        this.toastr.error('Error al buscar la cédula', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          //toastClass: 'alert alert-danger alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 11:
        this.toastr.warning('No se encuentra registrado', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          //toastClass: 'alert alert-danger alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      default:
        break;
    }
  }
}

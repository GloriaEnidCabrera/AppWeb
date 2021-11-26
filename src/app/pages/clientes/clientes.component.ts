import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { ClientService } from './client.service';
import { ActivatedRoute } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/clientes/read', title: 'Consultar', icon: 'fa-search', class: ''},
  { path: '/clientes/create', title: 'Crear', icon: 'fa-user-plus', class: ''},
  { path: '/clientes/update', title: 'Actualizar', icon: 'fa-user-edit', class: ''},
  { path: '/clientes/delete', title: 'Borrar', icon: 'fa-user-times', class: ''}
];

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  menuCrud: any[] | undefined;
  //control campos formulario
  flag_cedula: boolean = false;
  flag_telefono: boolean = false;
  flag_nombre: boolean = false;
  flag_email: boolean = false;
  flag_direccion: boolean = false;
  flag_table: boolean = false;
  //variable crud
  crud!: String;
  //Opciones y objeto revisor de la tabla
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  //camposModulo
  cedulaCliente!: number;
  telephoneCliente!: number;
  nameCliente: string = "";
  emailCliente: string = "";
  adressCliente: string = "";

  msjProceso: number = -1;
  //variable contenedora de contenidos
  contenido: any;

  //Constructor para solicitudes
  constructor(private cabecera: ActivatedRoute, private peticiones: ClientService) {
    this.cabecera.params.subscribe(params => {
      this.crud = params['crud'];

      switch (this.crud) {
        case "create": case "update":
          this.flag_cedula = true;
          this.flag_telefono = true;
          this.flag_nombre = true;
          this.flag_email = true;
          this.flag_direccion = true;
          this.flag_table = false;
          break;
          case "read": case "delete":
            this.flag_cedula = true;
            this.flag_telefono = false;
            this.flag_nombre = false;
            this.flag_email = false;
            this.flag_direccion = false;
            this.flag_table = false;
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
    //utilizando el servicio en la url
    this.dtTrigger.next(this.dtOptions);
    //Opciones especiales de la tabla, localización y caracteristicas
    this.dtOptions = {
      pagingType: 'full_numbers',
      columns: [{
        title: 'ID',
      }, {
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
        this.peticiones.postCliente(body).subscribe(data => {
          console.log(body);
          console.log(data);
          //this.dtTrigger.next(this.dtOptions);
        });
        break;
      case "read":
        this.flag_table = true;
        this.peticiones.getClienteCedula(this.cedulaCliente).subscribe(data => {
          this.contenido = data;
          console.log(data);
          
          this.dtTrigger.next(this.dtOptions);
          this.dtTrigger.unsubscribe();
        });
        break;
      case "update":
        this.peticiones.putCliente(this.cedulaCliente, body).subscribe(data => {
          console.log(body);
          console.log(data);
          //this.dtTrigger.next(this.dtOptions);
        });
        break;
      case "delete":
        this.peticiones.deleteCliente(this.cedulaCliente).subscribe(data => {
          console.log(data);
          //this.dtTrigger.next(this.dtOptions);
        });
        break;
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../../clientes/client.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, throwError } from 'rxjs';


@Component({
  selector: 'app-listaclientes',
  templateUrl: './listaclientes.component.html',
  styleUrls: ['./listaclientes.component.css']
})
export class ListaclientesComponent implements OnDestroy, OnInit {

  //Opciones y objeto revisor de la tabla
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  contenido: any;
  res: any;

  constructor(private peticiones: ClientService, private toastr: ToastrService) {

    }

  ngOnInit(): void {
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

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  //Constructor para solicitudes
  constructor(private objetohttp: HttpClient) { }

  //Opciones y objeto revisor de la tabla
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  //camposModulo
  cedulaCliente!: number;
  telephoneCliente: string = "";
  nameCliente: string = "";
  emailCliente: string = "";
  adressCliente!: number;

  msjProceso: number = -1;

  //variable receptora de documentos
  res: any;
  //variable contenedora de contenidos
  contenido: any;
  //url api get
  urlapiCliente: string = "http://localhost:8080/api/clientes";

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
    
  }
  //eliminando objeto revisor de cambios de la tabla
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  //FIN METODO ANGULAR DATATABLE

  codigoRespuesta!: number;
  postCliente() {
    this.objetohttp.post<any>(this.urlapiCliente,
      {
        "cedulaCliente": this.cedulaCliente,
        "correoElectronicoCliente": this.emailCliente,
        "direccionCliente": this.adressCliente,
        "nombreCliente": this.nameCliente,
        "telefonoCliente": this.telephoneCliente
      }, { observe: 'response' }
    ).subscribe(response => {
      this.codigoRespuesta = response.status;
    });
  }

  getCliente() {
    //utilizando el servicio en la url
    this.res = this.objetohttp.get(this.urlapiCliente+"="+this.cedulaCliente).pipe(catchError(this.handleError));

    //suscribe el archivo json y lo convierte  
    if (this.cedulaCliente != null) {
      this.msjProceso = 1;
      
      this.res.subscribe((datos: any[]) => {
        this.contenido = datos;
        console.log(this.contenido);
        this.dtTrigger.next(this.dtOptions);
      });
  
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
    } else {
      this.msjProceso = 9;
    }
  }
  //urlapiCliente: string = "http://localhost:8080/api/clientes";
  putCliente() {
    this.res = this.objetohttp.put<any>(this.urlapiCliente+"/"+this.cedulaCliente,
    {
      "cedulaCliente": this.cedulaCliente,
      "correoElectronicoCliente": this.emailCliente,
      "direccionCliente": this.adressCliente,
      "nombreCliente": this.nameCliente,
      "telefonoCliente": this.telephoneCliente
    }, { observe: 'response' }
  ).subscribe(response => {
    this.codigoRespuesta = response.status;
  });
  }

  deleteCliente() {
    this.res = this.objetohttp.delete(this.urlapiCliente+"/"+this.cedulaCliente).subscribe();
    console.log(this.res);
  }
}

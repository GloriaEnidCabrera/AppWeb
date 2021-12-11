import { Component, OnInit } from '@angular/core';
//import { VentasService } from '../ventas/ventas.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-consolidacion',
  templateUrl: './consolidacion.component.html',
  styleUrls: ['./consolidacion.component.css']
})
export class ConsolidacionComponent implements OnInit {


  //Función constructora

  constructor(private toastr: ToastrService, private objetohttp: HttpClient ) { }

  URL_CONS: string =  'http://localhost:8080/api/consolidados'
  contenido:any
  res: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


    ngOnInit(): void {
      this.dtTrigger.next(this.dtOptions);
    //Opciones especiales de la tabla, localización y caracteristicas
    this.dtOptions = {
      pagingType: 'full_numbers',
      columns: [/*{
        //title: 'ID',
      //},*/ {
        title: 'Ciudad',
      }, {
        title: 'Valor Total Ventas',
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
    this.mostrarTabla();
  }

  //eliminando objeto revisor de cambios de la tabla
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  mostrarTabla() {
    //solicitud para mostrar tabla
    this.res = this.objetohttp.get(this.URL_CONS);

    this.res.subscribe((datos: any[]) => {
      this.contenido = datos;
      console.log(this.contenido);
      this.dtTrigger.next(this.dtOptions);
      this.dtTrigger.unsubscribe();
    });
    //fin solicitud para mostrar tablas
  }
}

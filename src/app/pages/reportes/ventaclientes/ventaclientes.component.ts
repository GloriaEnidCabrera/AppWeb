import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../clientes/client.service';
import { VentasService } from '../../ventas/ventas.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, throwError } from 'rxjs';


@Component({
  selector: 'app-ventaclientes',
  templateUrl: './ventaclientes.component.html',
  styleUrls: ['./ventaclientes.component.css']
})
export class VentaclientesComponent implements OnInit {

  //Opciones y objeto revisor de la tabla
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  contenido: any;
  res: any;

  constructor(private peticiones: ClientService, private toastr: ToastrService,
    private pedidosale: VentasService) { }

  ngOnInit(): void {

    try {
      this.res = this.pedidosale.getSale();

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

  }

  //eliminando objeto revisor de cambios de la tabla
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}

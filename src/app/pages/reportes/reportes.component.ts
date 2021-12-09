import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/reportes/listaclientes', title: 'Listado de Clientes', icon: 'fa-list-alt', class: '' },
  { path: '/reportes/ventaclientes', title: 'Ventas por Cliente', icon: 'fa-hand-holding-usd', class: '' }
];

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  reportesCrud: any[] | undefined;

  constructor() { }

  ngOnInit(): void {
    this.reportesCrud = ROUTES.filter(reportesCrud => reportesCrud);
  }

}

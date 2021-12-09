import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Pagina principal', icon: 'fa-home', class: ''},
  { path: '/login', title: 'Iniciar Sesión', icon: 'fa-sign-in-alt', class: ''},
  { path: '/productos', title: 'Productos', icon: 'fa-store', class: ''},
  { path: '/clientes/crud', title: 'Clientes', icon: 'fa-users', class: ''},
  { path: '/ventas', title: 'Ventas', icon: 'fa-comment-dollar', class: ''},
  { path: '/reportes', title: 'Reportes', icon: 'fa-chart-area', class: ''},
  { path: '/consolidacion', title: 'Consolidacion', icon: 'fa-ruler-combined', class: ''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  menuItems: any[] | undefined;

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}

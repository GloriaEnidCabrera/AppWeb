import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

  toggle() {
    const sidebar = document.getElementById('sidebar');
    const contenido = document.getElementById('main');

    sidebar?.classList.toggle('toggle');
    contenido?.classList.toggle('main');
  }

  toggles() {
    const sidebar = document.getElementById('sidebar');
    const contenido = document.getElementById('main');

    sidebar?.classList.toggle('toggle');
    contenido?.classList.toggle('main');
  }

  toggleLeft() {
    const html = document.getElementById('html');
    const htmlSide = document.getElementById('html-side');
    const sidebar = document.getElementById('sidebar');

    html?.classList.toggle('nav-open');
    htmlSide?.classList.toggle('nav-open');
    sidebar?.classList.remove('toggle');
  }

  @HostListener("window:scroll", ['$event'])
  onScrollEvent($event: Event) {

    const botonFixed = document.getElementById('boton-sidebar_fixed');
    const navbar = document.getElementById('content-buttons')
    const scrollP = document.documentElement.scrollTop;

    //console.log(scrollP);
    if (scrollP >= 25) {
      navbar?.classList.add('none')
      botonFixed?.classList.add('block')
    } else {
      navbar?.classList.remove('none')
      botonFixed?.classList.remove('block')
    }
    //console.log($event);
    //console.log("scrolling");
  }
}

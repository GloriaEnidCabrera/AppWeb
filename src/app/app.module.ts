import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from "ngx-toastr";
//import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ComponentsModule } from "./components/components.module";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { ReportesComponent } from './pages/reportes/reportes.component';
import { ConsolidacionComponent } from './pages/consolidacion/consolidacion.component';
import { ListaclientesComponent } from './pages/reportes/listaclientes/listaclientes.component';
import { VentaclientesComponent } from './pages/reportes/ventaclientes/ventaclientes.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ProductosComponent,
    ClientesComponent,
    VentasComponent,
    ReportesComponent,
    ConsolidacionComponent,
    ListaclientesComponent,
    VentaclientesComponent,
  ],

  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    //NgbModule,
    RouterModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
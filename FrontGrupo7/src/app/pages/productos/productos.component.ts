import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  //Función constructora
  constructor(private objetohttp: HttpClient, private fileUploadService: FileUploadService) { }


  ngOnInit(): void {}
  
  ///////////////// POST /////////////////////////////
  codigoRespuesta: number = 0;
  res2: any;

  //lista que almacenara los resultados de la insercion de cada linea
  resultados: any;

  // Variable to store shortLink from api response
  file!: File; //variable para almacenar los datos

  //variable de confimación de recepcion de archivo
  recibido: boolean = false;

  // En caso de seleccionar archivo, escojer el primer archivo
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // Cuandop haga click, iniciar proceso de envio
  async onUpload() {
    console.log(this.file);
    this.resultados = await this.fileUploadService.upload(this.file);
    console.log(this.resultados);
  }

}
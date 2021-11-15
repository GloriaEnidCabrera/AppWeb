import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosComponent } from './productos.component';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  // API url
  baseApiUrl = "http://localhost:8080/api/productos";

  //inicializando objeto http
  constructor(private http: HttpClient) { }

  //variable auxiliar que almacena resultados de cada envio
  resultados = Array();

  // Retorna un objeto observable
  upload(file: any): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      //leyendo el contenido
      var reader = new FileReader();
      reader.onloadend = (e) => {

        let lines = reader.result as string;

        let separados = lines.split("\n");
        for (let lineaactual of separados) {
          for (let i = 0; i < 5; i++) {
            lineaactual = lineaactual.replace(";", ",");
          }
          lineaactual = lineaactual.replace("\r", "");
          let columnas = lineaactual.split(",", 6);
          console.log(columnas)
          if (columnas.length > 5) {
            this.http.post(
              this.baseApiUrl,
              {
                codigoproducto: columnas[0],
                nombreproducto: columnas[1],
                nitproveedor: columnas[2],
                preciocompra: columnas[3],
                ivacompra: columnas[4],
                precioventa: columnas[5]
              },
              { observe: 'response' }).subscribe(
                (response: any) => {
                  let resaux = [];
                  resaux[0] = response.status;
                  this.resultados.push(resaux);
                }
              );
          }
        }
        console.log(this.resultados);
        resolve(this.resultados);
      };
      reader.readAsText(file);
    });
  }
}
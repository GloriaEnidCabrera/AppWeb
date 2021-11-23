import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  flag_id: boolean = false;
  flag_us: boolean = false;
  flag_name: boolean = false;
  flag_ps: boolean = false;
  flag_email: boolean = false;

  crud!: String;


  constructor(private cabecera: ActivatedRoute) {
    this.cabecera.params.subscribe(params => {
      this.crud = params['crud'];
      console.log(this.crud+"crud");

      switch (this.crud) {
        case "create":
          console.log("create");
          this.flag_id = true;
          this.flag_us = true;
          this.flag_name = true;
          this.flag_ps = true;
          this.flag_email = true;
          break;
        case "read":
          console.log("read");
          this.flag_id = true;
          this.flag_us = false;
          this.flag_name = false;
          this.flag_ps = false;
          this.flag_email = false;
          break;
        case "update":
          console.log("update");
          this.flag_id = true;
          this.flag_us = true;
          this.flag_name = true;
          this.flag_ps = true;
          this.flag_email = true;
          break;
        case "delete":
          console.log("delete");
          this.flag_id = true;
          this.flag_us = false;
          this.flag_name = false;
          this.flag_ps = false;
          this.flag_email = false;
          break;
        default:
          console.log("default");
          this.flag_id = true;
          this.flag_us = true;
          this.flag_name = true;
          this.flag_ps = true;
          this.flag_email = true;
          break;
      }
  
    });

    

  }

  ngOnInit(): void {

   

    
  }





}

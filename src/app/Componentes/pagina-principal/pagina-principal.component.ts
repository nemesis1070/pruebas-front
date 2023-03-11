import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilidadesService } from 'src/app/Servicios/utilidades.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit{

  constructor(private _route: Router,private _servicioUtilidad:UtilidadesService ) {
    
  }
  
  ngOnInit(): void {
  }

   /* 
    Cuando el usuario va a Cerrar la sesion en el html de este componente invoca este metodo,
    procede a eliminar los datos del token del usuario y nos envia a la pagina de login.    
    */

  cerrarSesion(){
   this._servicioUtilidad.eliminarSesionUsuario();
   this._route.navigate(['login']);
  }

}

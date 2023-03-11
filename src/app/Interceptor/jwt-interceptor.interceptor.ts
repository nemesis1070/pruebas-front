import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../Servicios/empleado.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private _servicioEmp:EmpleadoService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  /* Se obtiene el token generado por el usuario cuando se logea en la aplicacion 
  y se utiliza para modificar el contenido de las peticiones http 
  para agregar contenidos de headers con el token para realizar autenticaciones cada vez que se 
  ejecute en el servicio de empleado cuando se conecte con el api.
  */

  const informacionUsuario = localStorage.getItem("usuario");
  let token = JSON.parse(informacionUsuario!);
  
  let jwtToken = request.clone({
      setHeaders:{
        Authorization: `bearer ${token}`
      }
  });

  return next.handle(jwtToken);
  }
}

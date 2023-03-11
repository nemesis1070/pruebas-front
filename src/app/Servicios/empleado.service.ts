import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Empleado } from '../Interfaces/empleado';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  /* 
  Variables
  path ---> contiene la url del api de Empleado que se requiere invocar en este servicio
  */


  urlpath = "Empleado";
  path = `${environment.ApiUrl}/${this.urlpath}`;

  constructor(private http: HttpClient) { }

  /* 
    Contiene todas las peticiones http disponibles para ser invocadas en el api de Empleados,
    cada operacion retorna un observable del tipo ResponseApi creadas con las misma propiedades que envia 
    el API asi que se mapea automaticamente para se utilizadas en el componente segun se requiera. 
  */

  consultarEmpleados():Observable<ResponseApi>{ 
    return this.http.get<ResponseApi>(this.path);
  }

  EliminarEmpleado(idEmpleado: number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.path}/${idEmpleado}`);
  }

  CrearEmpleado(modelo: Empleado):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(this.path,modelo);
  }

  ConsultarEmpleado(idEmpleado:number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.path}/${idEmpleado}`);
  }

  ActualizarEmpleado(modelo:Empleado):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(this.path,modelo);
  }
}

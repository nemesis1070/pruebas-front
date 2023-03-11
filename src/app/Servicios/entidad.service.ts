import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Entidad } from '../Interfaces/entidad';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

    /* 
  Variables
  path ---> contiene la url del api de Entidad que se requiere invocar en este servicio
  */

  urlpath = "Entidad";
  path = `${environment.ApiUrl}/${this.urlpath}`;

  constructor(private http: HttpClient) { }
  
  /* 
    Contiene todas las peticiones http disponibles para ser invocadas en el api de Entidades,
    cada operacion retorna un observable del tipo ResponseApi creadas con las misma propiedades que envia 
    el API asi que se mapea automaticamente para se utilizadas en el componente segun se requiera. 
  */


  consultarEntidades():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(this.path);
  }

  EliminarEntidad(idEntidad: number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.path}/${idEntidad}`);
  }

  CrearEntidad(modelo: Entidad):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(this.path,modelo);
  }

  ConsultarEntidad(idEntidad:number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.path}/${idEntidad}`);
  }
  

  ActualizarEntidad(modelo: Entidad):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(this.path,modelo);
  }
}

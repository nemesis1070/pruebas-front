import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Login } from '../Interfaces/login';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    /* 
  Variables
  path ---> contiene la url del api de Usuario que se requiere invocar en este servicio
  */

  urlpath = "Usuario";
  path = `${environment.ApiUrl}/${this.urlpath}`;

  constructor(private http: HttpClient) { }

  /* 
    Contiene todas las peticiones http disponibles para ser invocadas en el api de Usuario,
    cada operacion retorna un observable del tipo ResponseApi creadas con las misma propiedades que envia 
    el API asi que se mapea automaticamente para se utilizadas en el componente segun se requiera. 
  */

  IniciarSesion(modelo: Login):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(this.path,modelo);
  }
}

import { Injectable } from '@angular/core';
import { Sesion } from '../Interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor() { }

  /*
  El servicio de utilidades se encarga de almacenar en el localStorage del explorador el token 
  cuando un usuario se logea correctamente , tambien tiene la opcion de eliminar esta informacion 
  en el localStorage del explorador cuando el usuario cierra la sesion en la aplicacion.
  */
  guardarSesionUsuario(usuarioSesion:Sesion){
    localStorage.setItem("usuario",JSON.stringify(usuarioSesion.token));
  }

  eliminarSesionUsuario(){
    localStorage.removeItem("usuario")
  }
}

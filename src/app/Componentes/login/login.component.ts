import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Interfaces/login';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { UtilidadesService } from 'src/app/Servicios/utilidades.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  formLogin!:FormGroup;

  constructor(private fb: FormBuilder,
              private _router: Router, 
              private _servicioUsuario: UsuarioService,
              private _servicioUtilidad:UtilidadesService) {
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  iniciarSesion(){
   
    /* 
    Se agrega la informacion que se obtiene en el reactive Form que se utiliza en el html al objeto Login
    para satisfacer el modelo que se requiere en el Api y hacer la peticion correctamente.  
    */

    const datosLogin : Login ={
     nombreUsuario : this.formLogin.value.usuario,
     password: this.formLogin.value.password
    };

    /* 
    Se realiza la invocacion al servicio de usuario que contiene el metodo iniciarSesion. 
    Como resultado de la invocacion el api retorna un objeto con la informacion del resultado de 
    la operacion solicitada, si el codigo es 200 significa que las credenciales son validas 
    y procede a enviarnos a la pagina principal,ademas se invoca el servicio de utilidad 
    para guardar el token que nos genera el api y que se utilizara en la aplicacion.    
    */

    this._servicioUsuario.IniciarSesion(datosLogin).subscribe(respuesta=>{
      if(respuesta.statusCode === 200){
        this._servicioUtilidad.guardarSesionUsuario(respuesta.datosResultado);
        this._router.navigate(["principal"]);
      }
    });
    
  }

  inicializarFormulario(){
    this.formLogin = this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    });
  }
}

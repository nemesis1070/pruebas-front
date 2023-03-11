import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Componentes/login/login.component';
import { AngularMaterialModule } from './Utilidades/angular-material/angular-material.module';
import { PaginaPrincipalComponent } from './Componentes/pagina-principal/pagina-principal.component';
import { JwtInterceptorInterceptor } from './Interceptor/jwt-interceptor.interceptor';


/* 
En este modulo se hace importacion del modulo AngularMaterialModule que contiene todos los modulos de angular 
material que fueron utilizados y que estan disponibles para el diseño de las paginas html de los componentes 
que estan asociados a este modulo.
*/


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginaPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

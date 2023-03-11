import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componentes/login/login.component';
import { EmpleadoComponent } from './Componentes/pagina-principal/empleado/empleado.component';
import { EntidadComponent } from './Componentes/pagina-principal/entidad/entidad.component';
import { PaginaPrincipalComponent } from './Componentes/pagina-principal/pagina-principal.component';

/* 
  En la seccion de rutas se realiza una lazy load del modulo PaginaPrincipalModule que contiene los componentes,
  empleados, entidad Pagina Principal y que seran cargados solo cuando el path de la url contenga la palabra principal 
  va a cargar todo el contenido del PaginaPrincipalModule
*/

const routes: Routes = [
  {path:'',component:LoginComponent,pathMatch:"full"},
  {path:'login',component:LoginComponent,pathMatch:"full"},
  {path:'principal',loadChildren:()=>import("./Componentes/pagina-principal/pagina-principal.module").then(m=>m.PaginaPrincipalModule)},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

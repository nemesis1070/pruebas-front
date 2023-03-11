import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { PaginaPrincipalRoutingModule } from './pagina-principal-routing.module';
import { AngularMaterialModule } from 'src/app/Utilidades/angular-material/angular-material.module';
import { EntidadComponent } from './entidad/entidad.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ModalEmpleadoComponent } from './Modals/modal-empleado/modal-empleado.component';
import { ModalEntidadComponent } from './Modals/modal-entidad/modal-entidad.component';

/* 
En este modulo se hace importacion del modulo AngularMaterialModule que contiene todos los modulos de angular 
material que fueron utilizados y que estan disponibles para el diseño de las paginas html de los componentes 
que estan asociados a este modulo.
*/

@NgModule({
  declarations: [
    EntidadComponent,
    EmpleadoComponent,
    ModalEmpleadoComponent,
    ModalEntidadComponent
  ],
  imports: [
    CommonModule,
    PaginaPrincipalRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PaginaPrincipalModule { }

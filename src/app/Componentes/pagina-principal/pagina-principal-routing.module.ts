import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EntidadComponent } from './entidad/entidad.component';
import { PaginaPrincipalComponent } from './pagina-principal.component';
import { PaginaPrincipalModule } from './pagina-principal.module';

const routes: Routes = [{
  path:'',
  component:PaginaPrincipalComponent,
  children:[
    {path:'entidad',component:EntidadComponent},
    {path:'empleado',component:EmpleadoComponent}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaPrincipalRoutingModule { }

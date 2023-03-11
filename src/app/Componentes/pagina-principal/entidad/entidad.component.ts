import { Component ,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Entidad } from 'src/app/Interfaces/entidad';
import { EntidadService } from 'src/app/Servicios/entidad.service';
import { ModalEntidadComponent } from '../Modals/modal-entidad/modal-entidad.component';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit{
 

  /* 
  Conjuntos de variables que se definen y que tiene la siguiente funcion:
  listaEntidades --> la informacion de todas las entidad que estan el db
  columnasTabla --> en este arreglo se realiza la definicion que las columnas que se van 
                    a utilizar en la tabla de angular material que se creo en el html del componente 
  dataSource --> este objeto se le asigna la informacion de las entidades obtenidas desde la db
                 y se utliza para que sea mapeado en la tabla de angular material que se creo 
                 en el html del componente
  */

  listaEntidades: Entidad[]=[];
  columnasTabla :string[] =['nombre', 'direccion','acciones'];
  dataSource =  new MatTableDataSource(this.listaEntidades);

  constructor(private _servicioEntidad: EntidadService,private _dialogEntidad: MatDialog) {
    
  }

  ngOnInit(): void {
    this.consultarEntidades();
  }

  /* 
    Se realiza la invocacion al servicio de entidades que contiene el metodo consultarEntidades,
    Como resultado de la invocacion el api retorna un objeto con la informacion del resultado de la operacion solicitada, 
    si el codigo es 200 significa que la ejecucion fue correcta, y procede a mapear la informacion 
    de todos las entidades que se encuentran en la base de datos.   
    */

  consultarEntidades(){
    this._servicioEntidad.consultarEntidades().subscribe(respuesta=>{
      if(respuesta.statusCode ===200){
        this.listaEntidades =respuesta.datosResultado;
      }
    });
  }

/* 
    Cuando el usuario desea crear un nueva entidd el metodo utiliza la inyeccion de dependencias definida en el constructor 
    para utilizar el MatDialog de angular material y se realiza la configuracion respectiva del dialog alli
    se hace referencia al componente que se quiere visualizar dentro del dialog, ademas se configura un metodo
    que es un observable y cuando detecta que el usuario cierra el dialog  
    procede a ejecutar el metodo de buscar las entidades.   
    */

  nuevaEntidad(){
    this._dialogEntidad.open(ModalEntidadComponent,{ height:'auto', width:'auto' , disableClose:true}).afterClosed().subscribe(resultado=>{
      if(resultado === "true"){
        this.consultarEntidades();
      }
    });
  }


  /* 
    Cuando el usuario desea editar una  entidad el metodo utiliza la inyeccion de dependencias definida en el constructor 
    para utilizar el MatDialog de angular material y se realiza la configuracion respectiva del dialog alli
    se hace referencia al componente que se quiere visualizar dentro del dialog , pero adicional se envia 
    como parametro al componente referenciado en el dialog un objeto con la informacion de la entidad que va a 
    ser editado, ademas se configura un metodo que es un observable y cuando detecta que el usuario cierra 
    el dialog procede a ejecutar el metodo de buscar los empleados.   
    */

  editarEntidad(modelo:Entidad){
    this._dialogEntidad.open(ModalEntidadComponent,{ height:'auto', width:'auto' , disableClose:true,data:modelo}).afterClosed().subscribe(resultado=>{
      if(resultado === "true"){
        this.consultarEntidades();
      }
    });
  }

   /* 
    Se realiza la invocacion al servicio de entidad que contiene el metodo eliminacionEntidad,
    Como resultado de la invocacion el api retorna un objeto con la informacion del resultado 
    de la operacion solicitada, si el codigo es 200 significa que la ejecucion fue correcta, 
    se invoca el metodo para obtener las entidades que se encuentran en la base de datos.   
    */

  eliminarEntidad(modelo:Entidad){
    this._servicioEntidad.EliminarEntidad(modelo.idEntidad).subscribe(respuesta=>{
      if(respuesta.statusCode ===200){
      this.consultarEntidades();
      }
    });
  }
}

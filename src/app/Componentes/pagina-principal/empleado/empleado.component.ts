import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/Interfaces/empleado';
import { EmpleadoService } from 'src/app/Servicios/empleado.service';
import { ModalEmpleadoComponent } from '../Modals/modal-empleado/modal-empleado.component';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  

  /* 
  Conjuntos de variables que se definen y que tiene la siguiente funcion:
  listaEmpleados --> la informacion de todos los empleados que estan el db
  columnasTabla --> en este arreglo se realiza la definicion que las columnas que se van 
                    a utilizar en la tabla de angular material que se creo en el html del componente 
  dataSource --> este objeto se le asigna la informacion de los empleados obtenidos desde la db
                 y se utliza para que sea mapeado en la tabla de angular material que se creo 
                 en el html del componente
  */

  listaEmpleados: Empleado[]=[];
  columnasTabla :string[] =['nombres', 'apellidos', 'edad', 'cargo','entidad','acciones'];
  dataSource =  new MatTableDataSource(this.listaEmpleados);

  constructor(private _servicioEmpleado: EmpleadoService,private _dialogEmpleado: MatDialog) {
    
  }

  ngOnInit(): void {
    this.consultarEmpleados();
  }

  /* 
    Se realiza la invocacion al servicio de empleados que contiene el metodo consultarEmpleados,
    Como resultado de la invocacion el api retorna un objeto con la informacion del resultado de la operacion solicitada, 
    si el codigo es 200 significa que la ejecucion fue correcta, y procede a mapear la informacion 
    de todos los empleados que se encuentran en la base de datos.   
    */

  consultarEmpleados(){ 

    this._servicioEmpleado.consultarEmpleados().subscribe(respuesta=>{
      if(respuesta.statusCode === 200){
        this.listaEmpleados = respuesta.datosResultado;
      }
    });
  }

/* 
    Cuando el usuario desea crear un nuevo empleado el metodo utiliza la inyeccion de dependencias definida en el constructor 
    para utilizar el MatDialog de angular material y se realiza la configuracion respectiva del dialog alli
    se hace referencia al componente que se quiere visualizar dentro del dialog, ademas se configura un metodo
    que es un observable y cuando detecta que el usuario cierra el dialog  
    procede a ejecutar el metodo de buscar los empleados.   
    */

  nuevoEmpleado(){
    this._dialogEmpleado.open(ModalEmpleadoComponent,{ height:'auto', width:'auto' , disableClose:true}).afterClosed().subscribe(resultado=>{
      if(resultado === "true"){
        this.consultarEmpleados();
      }
    });

  }

  /* 
    Cuando el usuario desea editar un empleado el metodo utiliza la inyeccion de dependencias definida en el constructor 
    para utilizar el MatDialog de angular material y se realiza la configuracion respectiva del dialog alli
    se hace referencia al componente que se quiere visualizar dentro del dialog , pero adicional se envia 
    como parametro al componente referenciado en el dialog un objeto con la informacion del empleado que va a 
    ser editado, ademas se configura un metodo que es un observable y cuando detecta que el usuario cierra 
    el dialog procede a ejecutar el metodo de buscar los empleados.   
    */


  editarEmpleado(item:Empleado){
    this._dialogEmpleado.open(ModalEmpleadoComponent,{ height:'auto', width:'auto' , disableClose:true,data:item}).afterClosed().subscribe(resultado=>{
      if(resultado === "true"){
        this.consultarEmpleados();
      }
    });
  }
  

    /* 
    Se realiza la invocacion al servicio de empleados que contiene el metodo eliminacionEmpleados,
    Como resultado de la invocacion el api retorna un objeto con la informacion del resultado 
    de la operacion solicitada, si el codigo es 200 significa que la ejecucion fue correcta, 
    se invoca el metodo para obtener los empleados que se encuentran en la base de datos.   
    */

  eliminarEmpleado(item:Empleado){
      this._servicioEmpleado.EliminarEmpleado(item.idEmpleado).subscribe(respuesta=>{
        if(respuesta.statusCode === 200){
        this.consultarEmpleados();
        }
      });
  }
}

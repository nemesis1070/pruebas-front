import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado } from 'src/app/Interfaces/empleado';
import { Entidad } from 'src/app/Interfaces/entidad';
import { EmpleadoService } from 'src/app/Servicios/empleado.service';
import { EntidadService } from 'src/app/Servicios/entidad.service';

@Component({
  selector: 'app-modal-empleado',
  templateUrl: './modal-empleado.component.html',
  styleUrls: ['./modal-empleado.component.css']
})
export class ModalEmpleadoComponent implements OnInit{
  

 /* 
  Conjuntos de variables que se definen y que tiene la siguiente funcion:
  listaEntidades --> contiene la lista de entidades disponibles en db y que hacer parte de la informacion
                     que puede agregar al empleado.
  formularioEmpleado --> contiene el formulario que va a contener la infomacion del Empleado 
                         que se piensa crear o editar y que se va a inyectar en el dialog de angular material 
  listaCargos --> contiene la lista de cargos que se utiliza para llenar una lista en el fomulario definido 
                  en el html y que hacer parte de la informacion que puede agregar al empleado.
  */


  formularioEmpleado!: FormGroup;
  tituloAccion:string = "Agregar";
  botonAccion: string ="Guardar";
  listaEntidades:Entidad[]=[];
  listaCargos: string[] = ['Supervisor','Asistente','Cajero'];


  /* 
  El decorador @Inject permite pasar informacion a un dialog en este caso, el componente recibe informacion 
  de un objeto desde otro componente para cargar la informacion del empledo en el formulario definido en el 
  html en caso de hacer edicion 
  
  MatDialogRef hace referencia al dialog de angular material que se piensa crear , ademas hace 
  referencia al componente que se va a visualizar como contenido.
  
  */
  
  constructor(private modalActual:MatDialogRef<ModalEmpleadoComponent>,
              @Inject(MAT_DIALOG_DATA) public informacionEmpleado:Empleado,
              private _formbuilder: FormBuilder,
              private _servicioEntidad:EntidadService,
              private _servicioEmpleado:EmpleadoService ) {
        
  }

  ngOnInit(): void {
    this.inicializarFormularios();
  }


  guardarEditar_Empleado(){
    
    const empleado: Empleado ={
      idEmpleado:this.informacionEmpleado == null? 0 :this.informacionEmpleado.idEmpleado,
      nombres: this.formularioEmpleado.value.nombres,
      apellidos:this.formularioEmpleado.value.apellidos,
      idEntidad: this.formularioEmpleado.value.idEntidad,
      edad: this.formularioEmpleado.value.edad,
      cargo: this.formularioEmpleado.value.cargo
    } 

    /* 
    Se valida si el objeto que se envia como parametro al dialog desde el componente Empleado y es vacio, 
    significa que es un proceso de creacion , se invoca al servicio de empleado y como resultado de la 
    invocacion el api retorna un objeto con la informacion del resultado de la operacion solicitada, 
    si el codigo es 200 significa que la ejecucion fue correcta, procede a invocar metodo de cerrar el dialog.   
    */

    if(this.informacionEmpleado == null){
      this._servicioEmpleado.CrearEmpleado(empleado).subscribe(respuesta=>{
        if(respuesta.statusCode === 200){
          this.modalActual.close("true");
        }     
      });
    }else{
      this._servicioEmpleado.ActualizarEmpleado(empleado).subscribe(respuesta=>{
        if(respuesta.statusCode === 200){
          this.modalActual.close("true");
        }  
      });
    }
  }



  inicializarFormularios(){

    this.formularioEmpleado = this._formbuilder.group({
      nombres:['',Validators.required],
      apellidos:['',Validators.required],
      edad:[0,Validators.required],
      idEntidad:['',Validators.required],
      cargo:['',Validators.required]
    });

    if(this.informacionEmpleado != null){
      this.tituloAccion = "Editar";
      this.botonAccion="Actualizar";
    }

    /* Se invoca al servicio de entidad y Como resultado de la invocacion 
       el api retorna un objeto con la informacion del resultado de la operacion solicitada, 
       si el codigo es 200 significa que la ejecucion fue correcta, se asigna la informacion de todas 
       las entidad a la propiedad listaEntidades
    */
    this._servicioEntidad.consultarEntidades().subscribe(respuesta=>{
      if(respuesta.statusCode === 200){
        this.listaEntidades = respuesta.datosResultado;
      }
    });


    /* 
    Se valida si el objeto que se envia como parametro al dialog desde el componente Empleado y tiene data , 
    significa que es un proceso de edicion , se actualiza los valores de cada campo del formulario 
    definido en el html con la informacion que llega en el objeto cuando se visualiza el dialog 
    el formulario del compoentente va a esta lleno con la informacion.   
    */
    if(this.informacionEmpleado != null){
      this.formularioEmpleado.patchValue({
        nombres: this.informacionEmpleado.nombres,
        apellidos: this.informacionEmpleado.apellidos,
        idEntidad: this.informacionEmpleado.idEntidad,
        edad: this.informacionEmpleado.edad,
        cargo : this.informacionEmpleado.cargo
      });
    }

  }
}

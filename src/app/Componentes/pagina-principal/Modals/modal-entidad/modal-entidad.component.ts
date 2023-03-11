import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entidad } from 'src/app/Interfaces/entidad';
import { EntidadService } from 'src/app/Servicios/entidad.service';

@Component({
  selector: 'app-modal-entidad',
  templateUrl: './modal-entidad.component.html',
  styleUrls: ['./modal-entidad.component.css']
})
export class ModalEntidadComponent implements OnInit {

  /* 
  Conjuntos de variables que se definen y que tiene la siguiente funcion:
  formularioEmpleado --> contiene el formulario que va a contener la infomacion de la entidad 
                         que se piensa crear o editar y que se va a inyectar en el dialog de angular material 
  */

  formularioEntidad!: FormGroup;
  tituloAccion:string = "Agregar";
  botonAccion: string ="Guardar";


   /* 
  El decorador @Inject permite pasar informacion a un dialog en este caso, el componente recibe informacion 
  de un objeto desde otro componente para cargar la informacion de la entidad en el formulario definido en el 
  html en caso de hacer edicion 
  
  MatDialogRef hace referencia al dialog de angular material que se piensa crear , ademas hace 
  referencia al componente que se va a visualizar como contenido.
  
  */


  constructor(private modalActual:MatDialogRef<ModalEntidadComponent>,
              @Inject(MAT_DIALOG_DATA) public informacionEntidad:Entidad,
              private _formbuilder: FormBuilder,
              private _servicioEntidad:EntidadService) {
     
      
  }

  ngOnInit(): void {
   this.inicializarFormularios();
  }

  guardarEditar_Entidad(){

    const entidad: Entidad ={
      idEntidad:this.informacionEntidad == null? 0 :this.informacionEntidad.idEntidad,
      nombre: this.formularioEntidad.value.nombre,
      direccion:this.formularioEntidad.value.direccion
    } 

    /* 
    Se valida si el objeto que se envia como parametro al dialog desde el componente Entidad y es vacio, 
    significa que es un proceso de creacion , se invoca al servicio de empleado y como resultado de la 
    invocacion el api retorna un objeto con la informacion del resultado de la operacion solicitada, 
    si el codigo es 200 significa que la ejecucion fue correcta, procede a invocar metodo de cerrar el dialog.   
    */

    if(this.informacionEntidad == null){
      this._servicioEntidad.CrearEntidad(entidad).subscribe(respuesta=>{       
        if(respuesta.statusCode === 200){
          this.modalActual.close("true");
        } 
      });
    }else{
      this._servicioEntidad.ActualizarEntidad(entidad).subscribe(respuesta=>{
        if(respuesta.statusCode === 200){
          this.modalActual.close("true");
        } 
      });
    }
  }

  inicializarFormularios(){
    
    this.formularioEntidad = this._formbuilder.group({
      nombre:['',Validators.required],
      direccion:['',Validators.required]
    });

    if(this.informacionEntidad != null){
      this.tituloAccion = "Editar";
      this.botonAccion="Actualizar";
    }

    /* 
    Se valida si el objeto que se envia como parametro al dialog desde el componente Entidad y tiene data , 
    significa que es un proceso de edicion , se actualiza los valores de cada campo del formulario 
    definido en el html con la informacion que llega en el objeto cuando se visualiza el dialog 
    el formulario del compoentente va a esta lleno con la informacion.   
    */

    if(this.informacionEntidad != null){
      this.formularioEntidad.patchValue({
        nombre: this.informacionEntidad.nombre,
        direccion: this.informacionEntidad.direccion
      });
    }
  }

}

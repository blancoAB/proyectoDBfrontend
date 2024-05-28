import { NgStyle} from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActividadModel } from "../models/actividad.models";
import { ActividadService } from "../services/actividad.service";

import { AlignDirective, BorderDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, TextColorDirective} from '@coreui/angular';

@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [RowComponent, ColComponent,TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,FormsModule, FormDirective, FormLabelDirective, FormControlDirective,FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,ButtonDirective, NgStyle,TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective],
  templateUrl: './actividad.component.html',
  styleUrl: './actividad.component.scss'
})


export class ActividadComponent {
listaActividades : ActividadModel[] = [];
actividadModelo: ActividadModel = new ActividadModel();
/**
 * 
 */
constructor(private actividadService:ActividadService){
  this.getActividades();
}
getActividades(){
  this.actividadService.getTodasLasActividades().subscribe({
    next : (respuesta)=>{
      console.log(respuesta);
      this.listaActividades = respuesta;
    },
    error: (error)=> {
      console.log(error)
    }
  })
}

guardarActividad(){
  console.log(this.actividadModelo);
  if (this.actividadModelo._id == '') {
    console.log("guardar", this.actividadModelo);
    this.agregarActividad();
  } else {
    console.log("editar", this.actividadModelo);
    this.editarActividad();
  }
}

agregarActividad(){
  console.log(this.actividadModelo);
  this.actividadService.agregarActividad(this.actividadModelo).subscribe({
    next : (respuesta)=>{
      console.log("se guardo exitosamente",respuesta);
      this.getActividades();
      this.actividadModelo = new ActividadModel();
    },
    error: (error)=> {
      console.log(error)
    }
  })
}


eliminarActividad(actividad: ActividadModel){
  console.log("item a eliminar");
  this.actividadService.eliminarActividad(actividad._id).subscribe({
    next : (respuesta)=>{
      console.log("se elimino exitosamente",respuesta);
      this.getActividades();
    },
    error: (error)=> {
      console.log(error)
    }
  })
}
verActividad(actividad: ActividadModel){
  this.actividadModelo = actividad;
}

editarActividad(){
  this.actividadService.editarActividad(this.actividadModelo).subscribe({
    next : (respuesta)=>{
      console.log("se edito exitosamente",respuesta);
      this.getActividades();
      this.actividadModelo = new ActividadModel();
    },
    error: (error)=> {
      console.log(error)
    }
})
}
}

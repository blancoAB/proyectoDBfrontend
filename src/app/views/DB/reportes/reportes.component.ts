import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActividadModel } from "../models/actividad.models";
import { ActividadService } from "../services/actividad.service";
import { AlignDirective, BorderDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RowComponent, ColComponent,TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,FormsModule, FormDirective, FormLabelDirective, FormControlDirective,FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,ButtonDirective, NgStyle,TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {
  listaActividades1 : ActividadModel[] = [];
  listaActividades2 : ActividadModel[] = [];
  actividadModelo: ActividadModel = new ActividadModel();
  usuarioSeleccionado: string = '';
  responsableSeleccionado: string = ''; 
  tipoActividadSeleccionado: string = ''; 
  /**
   * 
   */
  constructor(private actividadService:ActividadService){

  }
  getActividadesPorUsuario() {
    if (this.usuarioSeleccionado) {
      this.actividadService.Reporte1ActividadPorUsuario(this.usuarioSeleccionado).subscribe({
        next: (respuesta) => {
          this.listaActividades1 = respuesta;
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      this.listaActividades1 = [];
    }
  }

  getActividadesPorResponsableTipo() {
    this.actividadService.getTodasLasActividades().subscribe({
      next: (respuesta: ActividadModel[]) => {
        this.listaActividades2 = respuesta.filter(actividad =>
          (this.responsableSeleccionado ? actividad.idresponsable === this.responsableSeleccionado : true) &&
          (this.tipoActividadSeleccionado ? actividad.idtipo === this.tipoActividadSeleccionado : true)
        );
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

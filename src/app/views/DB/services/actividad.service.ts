import {HttpClient} from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ActividadModel } from "../models/actividad.models"
import { Observable } from "rxjs"
@Injectable({
    providedIn : 'root'
})

export class ActividadService{
    //url de su api (backend)
    private API_URL = 'http://localhost:7000/DB'
    constructor(private http: HttpClient){

    }
    getTodasLasActividades (): Observable<ActividadModel[]>{
        return this.http.get<ActividadModel[]>(`${this.API_URL}/getActividades`);
    }

    agregarActividad(actividad: ActividadModel) : Observable<ActividadModel> {
        return this.http.post<ActividadModel>(`${this.API_URL}/crear`, actividad);
      }

      eliminarActividad(idActividad: string) : Observable<ActividadModel> {
        return this.http.delete<ActividadModel>(`${this.API_URL}/eliminar/${idActividad}`);
      }

      editarActividad(actividad: ActividadModel) : Observable<ActividadModel> {
        return this.http.put<ActividadModel>(`${this.API_URL}/editar/${actividad._id}`, actividad);
      }

      Reporte1ActividadPorUsuario(usuario: string): Observable<ActividadModel[]> {
        return this.http.get<ActividadModel[]>(`${this.API_URL}/actividadusuario/${usuario}`);
      }

      Reporte2ActividadPorResponsable() : Observable<ActividadModel[]> {
        return this.http.get<ActividadModel[]>(`${this.API_URL}/actividadesPorProfesor`);
      }
}
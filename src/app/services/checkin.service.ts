import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

    private apiUrl = environment.apiUrl;
    private tiempoEspera = () => timeout(5000);
    constructor(private http: HttpClient) { }
  
    getInvitadoCheckin(idInvitado: String, idPase:Number | null): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = { uuidInvitado: idInvitado, paseId: idPase };
      console.log(body);
      if(idPase == null){
          return this.http.get(`${this.apiUrl}api/checkin/informacion/${idInvitado}`, {headers});
      }
      return this.http.get(`${this.apiUrl}api/checkin/informacion/${idInvitado}?idPase=${idPase}`, {headers}).pipe(this.tiempoEspera());
    }
    getListaInvitadosCheckin(){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get(`${this.apiUrl}api/checkin/lista-invitados`, {headers}).pipe(this.tiempoEspera());
  
    }
    postCheckin(idInvitado: String, idPase:Number | null){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = {
        uuidInvitado: idInvitado,
        paseId: idPase
      }
      console.log(body);
      return this.http.post(`${this.apiUrl}api/checkin`, body, {headers}).pipe(this.tiempoEspera());
    }
}

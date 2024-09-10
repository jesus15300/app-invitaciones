import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }
  
    getInvitadoCheckin(idInvitado: String, idPase:Number | null): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = { uuidInvitado: idInvitado, paseId: idPase };
      console.log(body);
      if(idPase == null){
          return this.http.get(`${this.apiUrl}api/checkin/informacion/${idInvitado}`, {headers});
      }
      return this.http.get(`${this.apiUrl}api/checkin/informacion/${idInvitado}?idPase=${idPase}`, {headers});
    }
    getListaInvitadosCheckin(){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get(`${this.apiUrl}api/checkin/lista-invitados`, {headers});
  
    }
}

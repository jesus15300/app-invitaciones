import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InvitacionService {


  //private apiUrl = 'http://127.0.0.1:8080/';
  private apiUrl = environment.apiUrl;
  //private apiUrl = '192.168.1.5/';

  constructor(private http: HttpClient) { }

  getInvitado(uuid: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}invitados/${uuid}`, {headers});
  }

  confirmarAsistencia(id: string, acompanantesExtra: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id, acompanantesExtra };
    console.log(body);
    
    return this.http.post(`${this.apiUrl}invitados/confirmar-asistencia`, body, {headers});
  }
  getPases(uuid:string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}pases/${uuid}`, {headers});
  }
  getReporte(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}invitados/estadisticas`, {headers});
  }
  getTotalInvitados(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}invitados`, {headers});

  }
}

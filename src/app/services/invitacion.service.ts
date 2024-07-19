import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitacionService {


  private apiUrl = 'http://127.0.0.1:8080/';
  //private apiUrl = 'https://xkxhds7f-8080.usw3.devtunnels.ms/';

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
}

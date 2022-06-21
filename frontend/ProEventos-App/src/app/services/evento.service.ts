import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Evento } from '@app/models/Evento';

@Injectable(
  {providedIn: 'root'}
)
export class EventoService {

  protected UrlService: string = environment.baseURL;

constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.UrlService}/Evento`);
  }

  getEventosByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.UrlService}/${tema}/tema`);
  }

  getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.UrlService}/${id}`);
  }


}

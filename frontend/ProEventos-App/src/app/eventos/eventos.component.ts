import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];
  widthImg = 150;
  marginImg = 2;
  exibirImg = true;
  // tslint:disable-next-line: variable-name
  private _filtroLista = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  getEventos(): void {
    const url = 'https://localhost:5001/api/Evento';
    this.http.get(url).subscribe(
      response => {
        this.eventos = response,
        this.eventosFiltrados = this.eventos
      },
      error => console.log(error)
    );
  }

  // tslint:disable-next-line: typedef
  exibirImagem(){
    this.exibirImg = !this.exibirImg;
  }

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1

    );
  }

}

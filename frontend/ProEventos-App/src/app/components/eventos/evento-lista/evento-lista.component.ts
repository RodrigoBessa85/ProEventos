import { Evento } from './../../../model/Evento';
import { EventoService } from './../../../services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  widthImg = 150;
  marginImg = 2;
  exibirImg = true;
  // tslint:disable-next-line: variable-name
  private _filtroLista = '';
  modalRef?: BsModalRef;

  constructor(private eventoService: EventoService,
              private modalService: BsModalService,
              private toastrService: ToastrService,
              private spinner: NgxSpinnerService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.getEventos();

    this.spinner.show();
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe(
      (_eventos: Evento[]) => {
        this.eventos = _eventos,
        this.eventosFiltrados = this.eventos;
      },
      error => {
        this.spinner.hide();
        this.toastrService.error('Erro ao carregar os eventos.', 'Erro:');
      },
      () => this.spinner.hide()
    );
  }

  // tslint:disable-next-line: typedef
  public exibirImagem(){
    this.exibirImg = !this.exibirImg;
  }

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(
      (evento: Evento) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmar(): void {
    this.modalRef?.hide();
    this.toastrService.success('Evento deletado com sucesso!', 'Deletado:');
  }

  deletar(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

}

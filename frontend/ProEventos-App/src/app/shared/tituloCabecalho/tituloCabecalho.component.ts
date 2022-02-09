import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tituloCabecalho',
  templateUrl: './tituloCabecalho.component.html',
  styleUrls: ['./tituloCabecalho.component.scss']
})
export class TituloCabecalhoComponent implements OnInit {

  @Input() tituloCabecalho = "";
  @Input() iconClass = 'fa fa-user';
  @Input() subtitulo = 'Desde 2021';
  @Input() botaoListar = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  listar(): void {
    this.router.navigate([`/${this.tituloCabecalho.toLocaleLowerCase()}/lista`]);
  }

}

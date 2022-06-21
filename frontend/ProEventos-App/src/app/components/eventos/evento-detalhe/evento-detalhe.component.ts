import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  formEventos!: FormGroup;

  get f(): any { return this.formEventos.controls; }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void {
    this.formEventos = this.fb.group({
        tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        local: ['', Validators.required],
        dataEvento: ['', Validators.required],
        qtdPessoas: ['', [Validators.required, Validators.min(20), Validators.max(120000)]],
        telefone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        imagemURL: ['', Validators.required]
    });
  }

  public resetForm(): void {
    this.formEventos.reset();
  }


}

import { ValidatorField } from './../../../helpers/ValidatorField';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  formRegistration!: FormGroup;

  get f(): any { return this.formRegistration.controls; }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }


  public createForm(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmarSenha')
    };

    this.formRegistration = this.fb.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      ckbTermo: ['', Validators.required]
    }, formOptions);
  }



}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'eventos', redirectTo: 'eventos/lista' },
  { path: 'eventos', component: EventosComponent,
    children: [
      { path: 'detalhe/:id', component: EventoDetalheComponent },
      { path: 'detalhe', component: EventoDetalheComponent },
      { path: 'lista', component: EventoListaComponent },
    ]
  },
  { path: 'palestrantes', component: PalestrantesComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: 'perfil', component: PerfilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

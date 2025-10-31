import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaPrincipal } from './telas/tela-principal';
import { Cadastro } from './telas/cadastro/cadastro';

const routes: Routes = [
  { path: '', component: TelaPrincipal },
  { path: 'cadastro', component: Cadastro }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TelaPrincipal } from './telas/tela-principal';
import { Cadastro } from './telas/cadastro/cadastro';

@NgModule({
  declarations: [App, TelaPrincipal, Cadastro],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [App],
})
export class AppModule {}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TelaPrincipal } from './telas/tela-principal';

@NgModule({
  declarations: [TelaPrincipal],
  imports: [BrowserModule],
  bootstrap: [TelaPrincipal]
})
export class AppModule { }
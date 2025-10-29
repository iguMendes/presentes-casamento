import { NgModule } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { AppModule } from './app-module';
import { serverRoutes } from './app.routes.server';
import { TelaPrincipal } from './telas/tela-principal';

@NgModule({
  imports: [AppModule],
  providers: [provideServerRendering(withRoutes(serverRoutes))],
  bootstrap: [TelaPrincipal],
})
export class AppServerModule {}

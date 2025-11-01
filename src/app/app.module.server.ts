import { NgModule } from '@angular/core';
import { AppModule } from './app-module'; // ou ./app.module
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';

@NgModule({
  imports: [AppModule],
  providers: [provideServerRendering(withRoutes(serverRoutes))],
  bootstrap: [AppModule]
})
export class AppServerModule {}
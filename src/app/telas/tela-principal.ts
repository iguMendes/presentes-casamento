import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.html',
  standalone: false,
  styleUrls: ['./tela-principal.scss']
})
export class TelaPrincipal {
  nome = 'Igor e Isabela';

  constructor(private router: Router) {}

  public presentear() {
    this.router.navigate(['/cadastro']);
  }
}
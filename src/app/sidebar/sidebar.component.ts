import { Component, OnInit  } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  nomeUsuario = '';


  constructor(private authenticationService: AuthenticationService, private htpp: HttpClient, private router: Router) {}

  navigateTo(option: string) {
    this.router.navigate(['/home', { outlets: { main: [option] } }]);
  }

  ngOnInit(): void {
    // Substitua pelo id do usuário logado obtido a partir do seu mecanismo de autenticação
     this.authenticationService.getNomeUsuarioLogado(Number(3)).subscribe((data: any) => {
      this.nomeUsuario = data.nome;
    });
  }
}

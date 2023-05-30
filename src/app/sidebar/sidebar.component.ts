import { Component, OnInit  } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  nomeUsuario = '';

  private apiUrl = 'http://localhost:3000';

  constructor(private authenticationService: AuthenticationService, private http: HttpClient, private router: Router) {this.nomeUsuario = this.authenticationService.getNomeUser()}

  navigateTo(option: string) {
    this.router.navigate(['/home', { outlets: { main: [option] } }]);
  }

  ngOnInit() {
  
  }
}

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

  
  constructor(private authenticationService: AuthenticationService, private http: HttpClient, private router: Router) {this.nomeUsuario = this.authenticationService.getNomeUser()}

  navigateTo(option: string) {
    this.router.navigate(['/home', { outlets: { main: [option] } }]);
  }

  ngOnInit() {
  
  }


}

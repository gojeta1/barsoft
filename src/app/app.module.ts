import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CadastroclientesComponent } from './cadastros/cadastroclientes/cadastroclientes.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CadastrousuarioComponent } from './cadastros/cadastrousuario/cadastrousuario.component';
import { EditarUsuarioComponent } from './editarusuario/editarusuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TabelaclientesComponent } from './tabelaclientes/tabelaclientes.component';
import { TabelausuariosComponent } from './tabelausuarios/tabelausuarios.component';
import { ConfirmamodalComponent } from './confirmamodal/confirmamodal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TokenInterceptor } from './token.interceptor';




export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    allowedDomains: ['example.com'],
    disallowedRoutes: ['example.com/login']
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    CadastroclientesComponent,
    SidebarComponent,
    CadastrousuarioComponent,
     EditarUsuarioComponent,
     TabelaclientesComponent,
     TabelausuariosComponent,
     ConfirmamodalComponent,
     

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    })
  ],
  
  providers: [JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }



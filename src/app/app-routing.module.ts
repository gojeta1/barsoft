import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CadastroclientesComponent } from './cadastros/cadastroclientes/cadastroclientes.component';
import { DashboardgeralComponent } from './dashboards/dashboardgeral/dashboardgeral.component';
import { DashboardsemanalComponent } from './dashboards/dashboardsemanal/dashboardsemanal.component';
import { DashboardmensalComponent } from './dashboards/dashboardmensal/dashboardmensal.component';
import { DashboardanualComponent } from './dashboards/dashboardanual/dashboardanual.component';
import { CadastrousuarioComponent } from './cadastros/cadastrousuario/cadastrousuario.component';
import { EditarUsuarioComponent } from './editarusuario/editarusuario.component';
import { TabelaclientesComponent } from './tabelaclientes/tabelaclientes.component';
import { TabelausuariosComponent } from './tabelausuarios/tabelausuarios.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard], children:[
    { path: 'cadastroclientes', component: CadastroclientesComponent, outlet:'main'},
    { path: 'dashboardgeral', component: DashboardgeralComponent, outlet:'main'},
    { path: 'dashboardsemanal', component: DashboardsemanalComponent, outlet:'main'},
    { path: 'dashboardmensal', component: DashboardmensalComponent, outlet:'main'},
    { path: 'dashboardanual', component: DashboardanualComponent, outlet:'main'},
    { path: 'tabelaclientes', component: TabelaclientesComponent, outlet:'main'},
    { path: 'tabelausuarios', component: TabelausuariosComponent, outlet:'main'},
    { path: 'cadastrousuario', component: CadastrousuarioComponent, outlet:'main'},
    { path: 'editarusuario', component: EditarUsuarioComponent, outlet:'main'},
  ]},
  { path: 'cadastroclientes', component: CadastroclientesComponent, canActivate:[AuthGuard]},
  { path: 'cadastrousuario', component: CadastrousuarioComponent, canActivate:[AuthGuard]},
  { path: 'editarusuario', component: EditarUsuarioComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

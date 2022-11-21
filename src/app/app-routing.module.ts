import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'caronas', loadComponent: () => import('./caronas/components/lista-caronas.component').then(mod => mod.ListaCaronasComponent)},
  { path:'carona/new', loadComponent: () => import('./caronas/components/criar-carona.component').then(mod => mod.CriarCaronaComponent)},
  { path:'login', loadComponent: () => import('./usuarios/components/login.component').then(mod => mod.LoginComponent)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { checkLoginGuard } from './shared/guards/check-login-guard';

const routes: Routes = [
 
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth-module').then(m => m.AuthModule),
    canActivate: [checkLoginGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home-module').then(m => m.HomeModule),
     // ✅ protegido con guard
  },
 
  { path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios-module').then(m => m.UsuariosModule) },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

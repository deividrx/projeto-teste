import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginComponent } from './core/login/login.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [
      AuthGuard
    ],
    loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule),
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

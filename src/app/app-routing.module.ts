import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
    path: '',
    component: AppComponent,
    children: [
      { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AppRouteGuard] },
      {
        path: 'setting',
        loadChildren: () => import('./setting/setting.module')
          .then(m => m.SettingModule),
      },
      {
        path: 'security',
        loadChildren: () => import('./security/security.module')
          .then(m => m.SecurityModule),
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

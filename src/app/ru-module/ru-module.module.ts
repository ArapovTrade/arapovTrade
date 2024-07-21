import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuHomeComponent } from './ru-home/ru-home.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RuHomePageComponent } from './ru-home/ru-home-page/ru-home-page.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    // path: 'home',

    component: RuHomeComponent,
    children: [
      { path: 'home', component: RuHomePageComponent },
      // { path: '', component: RuHomePageComponent },

      {
        path: 'studying',
        loadChildren: () =>
          import('./ru-home/ru-studying/ru-studying.module').then(
            (m) => m.RuStudyingModule
          ),
      },
      {
        path: 'trading',
        loadChildren: () =>
          import('./ru-home/ru-trading/ru-trading.module').then(
            (m) => m.RuTradingModule
          ),
      },
      {
        path: 'crypto',
        loadChildren: () =>
          import('./ru-home/ru-crypto/ru-crypto.module').then(
            (m) => m.RuCryptoModule
          ),
      },
      {
        path: 'freestudying',
        loadChildren: () =>
          import('./ru-home/ru-blog/ru-blog.module').then(
            (m) => m.RuBlogModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [RuHomeComponent, RuHomePageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RuModuleModule {}

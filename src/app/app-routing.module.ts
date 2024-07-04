import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UkModuleModule } from './uk-module/uk-module.module';

const routes: Routes = [
  { path: '', redirectTo: 'uk/home', pathMatch: 'full' },
  {
    path: 'uk',
    loadChildren: () =>
      import('./uk-module/uk-module.module').then((m) => m.UkModuleModule),
    // path: 'uk',
    // loadChildren: () => UkModuleModule,
  },
  {
    path: 'ru',
    loadChildren: () =>
      import('./ru-module/ru-module.module').then((m) => m.RuModuleModule),
  },
  {
    path: 'en',
    loadChildren: () =>
      import('./en-module/en-module.module').then((m) => m.EnModuleModule),
  },
  {
    path: '**',
    redirectTo: (url: any) => {
      const path = url.url.join('');
      return path.endsWith('/') ? path.slice(0, -1) : path;
    },
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

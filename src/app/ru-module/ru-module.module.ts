import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuHomeComponent } from './ru-home/ru-home.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RuHomePageComponent } from './ru-home/ru-home-page/ru-home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisclaimerComponent } from './ru-home/doc/disclaimer/disclaimer.component';

const routes: Routes = [
  {
    path: '',

    component: RuHomeComponent,
  },
   

  {
    path: 'disclaimer',
    component: DisclaimerComponent,
  },
  {
    path: 'studying',
    loadChildren: () =>
      import('./ru-home/ru-studying/ru-studying.module').then(
        (m) => m.RuStudyingModule
      ),
  },

  {
    path: 'freestudying',
    loadChildren: () =>
      import('./ru-home/ru-blog/ru-blog.module').then((m) => m.RuBlogModule),
  },
   
];

@NgModule({
  declarations: [RuHomeComponent, RuHomePageComponent, DisclaimerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class RuModuleModule {}

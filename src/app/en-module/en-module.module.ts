import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnHomeComponent } from './en-home/en-home.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './en-home/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisclaimerenComponent } from './en-home/doc/disclaimeren/disclaimeren.component';

const routes: Routes = [
  {
    path: '',
    component: EnHomeComponent,
  },
   
    { path: 'home', component: HomePageComponent },
  {
    path: 'disclaimer',
    component: DisclaimerenComponent,
  },
  {
    path: 'studying',
    loadChildren: () =>
      import('./en-home/en-studying/en-studying.module').then(
        (m) => m.EnStudyingModule
      ),
  },
   
   
  {
    path: 'freestudying',
    loadChildren: () =>
      import('./en-home/eu-blog/eu-blog.module').then((m) => m.EuBlogModule),
  },
    
  // },
];

@NgModule({
  declarations: [EnHomeComponent, HomePageComponent, DisclaimerenComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class EnModuleModule {}

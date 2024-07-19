import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkBlogHomepageComponent } from './uk-blog-homepage/uk-blog-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UkBlogHomepageComponent },
  {
    path: '1',
    loadChildren: () =>
      import('./one-uk-blog/one-uk-blog.module').then((m) => m.OneUkBlogModule),
  },
];

@NgModule({
  declarations: [UkBlogHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UkblogModule {}

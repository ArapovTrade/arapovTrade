import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuBlogHomepageComponent } from './ru-blog-homepage/ru-blog-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RuBlogHomepageComponent },
  {
    path: 'blogmarketphases',
    loadChildren: () =>
      import('./one-ru-blog/one-ru-blog.module').then((m) => m.OneRuBlogModule),
  },
  {
    path: 'divergenceonindecators',
    loadChildren: () =>
      import('./two-ru-blog/two-ru-blog.module').then((m) => m.TwoRuBlogModule),
  },
  {
    path: 'volatility',
    loadChildren: () =>
      import('./three-ru-blog/three-ru-blog.module').then(
        (m) => m.ThreeRuBlogModule
      ),
  },
  {
    path: '4',
    loadChildren: () =>
      import('./four-ru-blog/four-ru-blog.module').then(
        (m) => m.FourRuBlogModule
      ),
  },
  {
    path: '5',
    loadChildren: () =>
      import('./five-ru-blog/five-ru-blog.module').then(
        (m) => m.FiveRuBlogModule
      ),
  },
  {
    path: '6',
    loadChildren: () =>
      import('./six-ru-blog/six-ru-blog.module').then((m) => m.SixRuBlogModule),
  },
  {
    path: '7',
    loadChildren: () =>
      import('./seven-ru-blog/seven-ru-blog.module').then(
        (m) => m.SevenRuBlogModule
      ),
  },
  {
    path: '8',
    loadChildren: () =>
      import('./eight-ru-blog/eight-ru-blog.module').then(
        (m) => m.EightRuBlogModule
      ),
  },
  {
    path: '9',
    loadChildren: () =>
      import('./nine-ru-blog/nine-ru-blog.module').then(
        (m) => m.NineRuBlogModule
      ),
  },
  {
    path: '10',
    loadChildren: () =>
      import('./ten-ru-blog/ten-ru-blog.module').then((m) => m.TenRuBlogModule),
  },
];

@NgModule({
  declarations: [RuBlogHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RuBlogModule {}

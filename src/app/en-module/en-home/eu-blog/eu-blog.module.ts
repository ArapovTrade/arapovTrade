import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnBlogHomepageComponent } from './en-blog-homepage/en-blog-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: EnBlogHomepageComponent },
  {
    path: 'blogmarketphases',
    loadChildren: () =>
      import('./one-en-blog/one-en-blog.module').then((m) => m.OneEnBlogModule),
  },
  {
    path: 'divergenceonindecators',
    loadChildren: () =>
      import('./two-en-blog/two-en-blog.module').then((m) => m.TwoEnBlogModule),
  },
  {
    path: 'volatility',
    loadChildren: () =>
      import('./three-en-blog/three-en-blog.module').then(
        (m) => m.ThreeEnBlogModule
      ),
  },
  {
    path: 'reasonfordepositeloose',
    loadChildren: () =>
      import('./four-en-blog/four-en-blog.module').then(
        (m) => m.FourEnBlogModule
      ),
  },
  {
    path: 'pricingandliquidity',
    loadChildren: () =>
      import('./five-en-blog/five-en-blog.module').then(
        (m) => m.FiveEnBlogModule
      ),
  },
  {
    path: 'smartestmoney',
    loadChildren: () =>
      import('./six-en-blog/six-en-blog.module').then((m) => m.SixEnBlogModule),
  },
  {
    path: '7',
    loadChildren: () =>
      import('./seven-en-blog/seven-en-blog.module').then(
        (m) => m.SevenEnBlogModule
      ),
  },
  {
    path: '8',
    loadChildren: () =>
      import('./eight-en-blog/eight-en-blog.module').then(
        (m) => m.EightEnBlogModule
      ),
  },
  {
    path: '9',
    loadChildren: () =>
      import('./nine-en-blog/nine-en-blog.module').then(
        (m) => m.NineEnBlogModule
      ),
  },
  {
    path: '10',
    loadChildren: () =>
      import('./ten-en-blog/ten-en-blog.module').then((m) => m.TenEnBlogModule),
  },
];

@NgModule({
  declarations: [EnBlogHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EuBlogModule {}

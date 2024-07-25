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
    path: 'reasonfordepositeloose',
    loadChildren: () =>
      import('./four-ru-blog/four-ru-blog.module').then(
        (m) => m.FourRuBlogModule
      ),
  },
  {
    path: 'pricingandliquidity',
    loadChildren: () =>
      import('./five-ru-blog/five-ru-blog.module').then(
        (m) => m.FiveRuBlogModule
      ),
  },
  {
    path: 'smartestmoney',
    loadChildren: () =>
      import('./six-ru-blog/six-ru-blog.module').then((m) => m.SixRuBlogModule),
  },
  {
    path: 'makingmoneyintrading',
    loadChildren: () =>
      import('./seven-ru-blog/seven-ru-blog.module').then(
        (m) => m.SevenRuBlogModule
      ),
  },
  {
    path: 'imbalanceintrading',
    loadChildren: () =>
      import('./eight-ru-blog/eight-ru-blog.module').then(
        (m) => m.EightRuBlogModule
      ),
  },
  {
    path: 'predictmarketprice',
    loadChildren: () =>
      import('./nine-ru-blog/nine-ru-blog.module').then(
        (m) => m.NineRuBlogModule
      ),
  },
  {
    path: 'mainreasonforlosses',
    loadChildren: () =>
      import('./ten-ru-blog/ten-ru-blog.module').then((m) => m.TenRuBlogModule),
  },
  {
    path: '11', //11
    loadChildren: () =>
      import('./eleven-ru-blog/eleven-ru-blog.module').then(
        (m) => m.ElevenRuBlogModule
      ),
  },
  {
    path: '12', //12
    loadChildren: () =>
      import('./twelve-ru-blog/twelve-ru-blog.module').then(
        (m) => m.TwelveRuBlogModule
      ),
  },
  {
    path: '13', //13
    loadChildren: () =>
      import('./thirteen-ru-blog/thirteen-ru-blog.module').then(
        (m) => m.ThirteenRuBlogModule
      ),
  },
  {
    path: '14', //14
    loadChildren: () =>
      import('./fourteen-ru-blog/fourteen-ru-blog.module').then(
        (m) => m.FourteenRuBlogModule
      ),
  },
  {
    path: '15', //15
    loadChildren: () =>
      import('./fiveteen-ru-blog/fiveteen-ru-blog.module').then(
        (m) => m.FiveteenRuBlogModule
      ),
  },
  {
    path: '16', //16
    loadChildren: () =>
      import('./sixteen-ru-blog/sixteen-ru-blog.module').then(
        (m) => m.SixteenRuBlogModule
      ),
  },
  {
    path: '17', //17
    loadChildren: () =>
      import('./seventeen-ru-blog/seventeen-ru-blog.module').then(
        (m) => m.SeventeenRuBlogModule
      ),
  },
  {
    path: '18', //18
    loadChildren: () =>
      import('./eighteen-ru-blog/eighteen-ru-blog.module').then(
        (m) => m.EighteenRuBlogModule
      ),
  },
  {
    path: '19', //19
    loadChildren: () =>
      import('./nineteen-ru-blog/nineteen-ru-blog.module').then(
        (m) => m.NineteenRuBlogModule
      ),
  },
  {
    path: '20', //20
    loadChildren: () =>
      import('./twenty-ru-blog/twenty-ru-blog.module').then(
        (m) => m.TwentyRuBlogModule
      ),
  },
];

@NgModule({
  declarations: [RuBlogHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RuBlogModule {}

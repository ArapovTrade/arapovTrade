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
    path: 'makingmoneyintrading',
    loadChildren: () =>
      import('./seven-en-blog/seven-en-blog.module').then(
        (m) => m.SevenEnBlogModule
      ),
  },
  {
    path: 'imbalanceintrading',
    loadChildren: () =>
      import('./eight-en-blog/eight-en-blog.module').then(
        (m) => m.EightEnBlogModule
      ),
  },
  {
    path: 'predictmarketprice',
    loadChildren: () =>
      import('./nine-en-blog/nine-en-blog.module').then(
        (m) => m.NineEnBlogModule
      ),
  },
  {
    path: 'mainreasonforlosses',
    loadChildren: () =>
      import('./ten-en-blog/ten-en-blog.module').then((m) => m.TenEnBlogModule),
  },
  {
    path: 'starterdeposit', //11
    loadChildren: () =>
      import('./eleven-en-blog/eleven-en-blog.module').then(
        (m) => m.ElevenEnBlogModule
      ),
  },
  {
    path: 'tradingoflevels', //12
    loadChildren: () =>
      import('./twelve-en-blog/twelve-en-blog.module').then(
        (m) => m.TwelveEnBlogModule
      ),
  },
  {
    path: 'wavesofelliott', //13
    loadChildren: () =>
      import('./thirteen-en-blog/thirteen-en-blog.module').then(
        (m) => m.ThirteenEnBlogModule
      ),
  },
  {
    path: 'tradingandinvestments', //14
    loadChildren: () =>
      import('./fourteen-en-blog/fourteen-en-blog.module').then(
        (m) => m.FourteenEnBlogModule
      ),
  },
  {
    path: 'futurestrading', //15
    loadChildren: () =>
      import('./fiveteen-en-blog/fiveteen-en-blog.module').then(
        (m) => m.FiveteenEnBlogModule
      ),
  },
  {
    path: 'trandingchannels', //16
    loadChildren: () =>
      import('./sixteen-en-blog/sixteen-en-blog.module').then(
        (m) => m.SixteenEnBlogModule
      ),
  },
  {
    path: 'tradingmyths', //17
    loadChildren: () =>
      import('./seventeen-en-blog/seventeen-en-blog.module').then(
        (m) => m.SeventeenEnBlogModule
      ),
  },
  {
    path: 'volmarketanalisys', //18
    loadChildren: () =>
      import('./eighteen-en-blog/eighteen-en-blog.module').then(
        (m) => m.EighteenEnBlogModule
      ),
  },
  {
    path: 'smartmoneyeducation', //19
    loadChildren: () =>
      import('./nineteen-en-blog/nineteen-en-blog.module').then(
        (m) => m.NineteenEnBlogModule
      ),
  },
  {
    path: '20', //20
    loadChildren: () =>
      import('./twenty-en-blog/twenty-en-blog.module').then(
        (m) => m.TwentyEnBlogModule
      ),
  },
];

@NgModule({
  declarations: [EnBlogHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EuBlogModule {}

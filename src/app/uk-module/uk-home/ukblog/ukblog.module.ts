import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkBlogHomepageComponent } from './uk-blog-homepage/uk-blog-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UkBlogHomepageComponent },
  {
    path: 'blogmarketphases', //1
    loadChildren: () =>
      import('./one-uk-blog/one-uk-blog.module').then((m) => m.OneUkBlogModule),
  },
  {
    path: 'divergenceonindecators', //2
    loadChildren: () =>
      import('./two-uk-blog/two-uk-blog.module').then((m) => m.TwoUkBlogModule),
  },
  {
    path: 'volatility', //3
    loadChildren: () =>
      import('./three-uk-blog/three-uk-blog.module').then(
        (m) => m.ThreeUkBlogModule
      ),
  },
  {
    path: 'reasonfordepositeloose', //4
    loadChildren: () =>
      import('./four-uk-blog/four-uk-blog.module').then(
        (m) => m.FourUkBlogModule
      ),
  },
  {
    path: 'pricingandliquidity', //5
    loadChildren: () =>
      import('./five-uk-blog/five-uk-blog.module').then(
        (m) => m.FiveUkBlogModule
      ),
  },
  {
    path: 'smartestmoney', //6
    loadChildren: () =>
      import('./six-uk-blog/six-uk-blog.module').then((m) => m.SixUkBlogModule),
  },
  {
    path: 'makingmoneyintrading', //7
    loadChildren: () =>
      import('./seven-uk-blog/seven-uk-blog.module').then(
        (m) => m.SevenUkBlogModule
      ),
  },
  {
    path: 'imbalanceintrading', //8
    loadChildren: () =>
      import('./eight-uk-blog/eight-uk-blog.module').then(
        (m) => m.EightUkBlogModule
      ),
  },
  {
    path: 'predictmarketprice', //9
    loadChildren: () =>
      import('./nine-uk-blog/nine-uk-blog.module').then(
        (m) => m.NineUkBlogModule
      ),
  },
  {
    path: 'mainreasonforlosses', //10
    loadChildren: () =>
      import('./ten-uk-blog/ten-uk-blog.module').then((m) => m.TenUkBlogModule),
  },
  {
    path: 'starterdeposit', //11
    loadChildren: () =>
      import('./eleven-uk-blog/eleven-uk-blog.module').then(
        (m) => m.ElevenUkBlogModule
      ),
  },
  {
    path: 'tradingoflevels', //12
    loadChildren: () =>
      import('./twelve-uk-blog/twelve-uk-blog.module').then(
        (m) => m.TwelveUkBlogModule
      ),
  },
  {
    path: 'wavesofelliott', //13
    loadChildren: () =>
      import('./thirteen-uk-blog/thirteen-uk-blog.module').then(
        (m) => m.ThirteenUkBlogModule
      ),
  },
  {
    path: 'tradingandinvestments', //14
    loadChildren: () =>
      import('./fourteen-uk-blog/fourteen-uk-blog.module').then(
        (m) => m.FourteenUkBlogModule
      ),
  },
  {
    path: 'futurestrading', //15
    loadChildren: () =>
      import('./fiveteen-uk-blog/fiveteen-uk-blog.module').then(
        (m) => m.FiveteenUkBlogModule
      ),
  },
  {
    path: '16', //16
    loadChildren: () =>
      import('./sixteen-uk-blog/sixteen-uk-blog.module').then(
        (m) => m.SixteenUkBlogModule
      ),
  },
  {
    path: '17', //17
    loadChildren: () =>
      import('./seventeen-uk-blog/seventeen-uk-blog.module').then(
        (m) => m.SeventeenUkBlogModule
      ),
  },
  {
    path: '18', //18
    loadChildren: () =>
      import('./eighteen-uk-blog/eighteen-uk-blog.module').then(
        (m) => m.EighteenUkBlogModule
      ),
  },
  {
    path: '19', //19
    loadChildren: () =>
      import('./nineteen-uk-blog/nineteen-uk-blog.module').then(
        (m) => m.NineteenUkBlogModule
      ),
  },
  {
    path: '20', //20
    loadChildren: () =>
      import('./twenty-uk-blog/twenty-uk-blog.module').then(
        (m) => m.TwentyUkBlogModule
      ),
  },
];

@NgModule({
  declarations: [UkBlogHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UkblogModule {}

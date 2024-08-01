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
    path: 'starterdeposit', //11
    loadChildren: () =>
      import('./eleven-ru-blog/eleven-ru-blog.module').then(
        (m) => m.ElevenRuBlogModule
      ),
  },
  {
    path: 'tradingoflevels', //12
    loadChildren: () =>
      import('./twelve-ru-blog/twelve-ru-blog.module').then(
        (m) => m.TwelveRuBlogModule
      ),
  },
  {
    path: 'wavesofelliott', //13
    loadChildren: () =>
      import('./thirteen-ru-blog/thirteen-ru-blog.module').then(
        (m) => m.ThirteenRuBlogModule
      ),
  },
  {
    path: 'tradingandinvestments', //14
    loadChildren: () =>
      import('./fourteen-ru-blog/fourteen-ru-blog.module').then(
        (m) => m.FourteenRuBlogModule
      ),
  },
  {
    path: 'futurestrading', //15
    loadChildren: () =>
      import('./fiveteen-ru-blog/fiveteen-ru-blog.module').then(
        (m) => m.FiveteenRuBlogModule
      ),
  },
  {
    path: 'trandingchannels', //16
    loadChildren: () =>
      import('./sixteen-ru-blog/sixteen-ru-blog.module').then(
        (m) => m.SixteenRuBlogModule
      ),
  },
  {
    path: 'tradingmyths', //17
    loadChildren: () =>
      import('./seventeen-ru-blog/seventeen-ru-blog.module').then(
        (m) => m.SeventeenRuBlogModule
      ),
  },
  {
    path: 'volmarketanalisys', //18
    loadChildren: () =>
      import('./eighteen-ru-blog/eighteen-ru-blog.module').then(
        (m) => m.EighteenRuBlogModule
      ),
  },
  {
    path: 'smartmoneyeducation', //19
    loadChildren: () =>
      import('./nineteen-ru-blog/nineteen-ru-blog.module').then(
        (m) => m.NineteenRuBlogModule
      ),
  },
  {
    path: 'besttimefortrading', //20
    loadChildren: () =>
      import('./twenty-ru-blog/twenty-ru-blog.module').then(
        (m) => m.TwentyRuBlogModule
      ),
  },
  {
    path: 'marketmaker', //21
    loadChildren: () =>
      import('./twenty-one-ru-blog/twenty-one-ru-blog.module').then(
        (m) => m.TwentyOneRuBlogModule
      ),
  },
  {
    path: 'pricepatterns', //22
    loadChildren: () =>
      import('./twenty-two-ru-blog/twenty-two-ru-blog.module').then(
        (m) => m.TwentyTwoRuBlogModule
      ),
  },
  {
    path: 'liqudityintrading', //23
    loadChildren: () =>
      import('./twenty-three-ru-blog/twenty-three-ru-blog.module').then(
        (m) => m.TwentyThreeRuBlogModule
      ),
  },
  {
    path: 'flagfigure', //24
    loadChildren: () =>
      import('./twenty-four-ru-blog/twenty-four-ru-blog.module').then(
        (m) => m.TwentyFourRuBlogModule
      ),
  },
  {
    path: '25', //25
    loadChildren: () =>
      import('./twenty-five-ru-blog/twenty-five-ru-blog.module').then(
        (m) => m.TwentyFiveRuBlogModule
      ),
  },
  {
    path: '26', //26
    loadChildren: () =>
      import('./twenty-six-ru-blog/twenty-six-ru-blog.module').then(
        (m) => m.TwentySixRuBlogModule
      ),
  },
  {
    path: '27', //27
    loadChildren: () =>
      import('./twenty-seven-ru-blog/twenty-seven-ru-blog.module').then(
        (m) => m.TwentySevenRuBlogModule
      ),
  },
  {
    path: '28', //28
    loadChildren: () =>
      import('./twenty-eight-ru-blog/twenty-eight-ru-blog.module').then(
        (m) => m.TwentyEightRuBlogModule
      ),
  },
  {
    path: '29', //29
    loadChildren: () =>
      import('./twenty-nine-ru-blog/twenty-nine-ru-blog.module').then(
        (m) => m.TwentyNineRuBlogModule
      ),
  },
  {
    path: '30', //30
    loadChildren: () =>
      import('./thirty-ru-blog/thirty-ru-blog.module').then(
        (m) => m.ThirtyRuBlogModule
      ),
  },
];

@NgModule({
  declarations: [RuBlogHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RuBlogModule {}

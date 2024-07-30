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
    path: 'trandingchannels', //16
    loadChildren: () =>
      import('./sixteen-uk-blog/sixteen-uk-blog.module').then(
        (m) => m.SixteenUkBlogModule
      ),
  },
  {
    path: 'tradingmyths', //17
    loadChildren: () =>
      import('./seventeen-uk-blog/seventeen-uk-blog.module').then(
        (m) => m.SeventeenUkBlogModule
      ),
  },
  {
    path: 'volmarketanalisys', //18
    loadChildren: () =>
      import('./eighteen-uk-blog/eighteen-uk-blog.module').then(
        (m) => m.EighteenUkBlogModule
      ),
  },
  {
    path: 'smartmoneyeducation', //19
    loadChildren: () =>
      import('./nineteen-uk-blog/nineteen-uk-blog.module').then(
        (m) => m.NineteenUkBlogModule
      ),
  },
  {
    path: 'besttimefortrading', //20
    loadChildren: () =>
      import('./twenty-uk-blog/twenty-uk-blog.module').then(
        (m) => m.TwentyUkBlogModule
      ),
  },
  {
    path: 'marketmaker', //21
    loadChildren: () =>
      import('./twenty-one-uk-blog/twenty-one-uk-blog.module').then(
        (m) => m.TwentyOneUkBlogModule
      ),
  },
  {
    path: 'pricepatterns', //22
    loadChildren: () =>
      import('./twenty-two-uk-blog/twenty-two-uk-blog.module').then(
        (m) => m.TwentyTwoUkBlogModule
      ),
  },
  {
    path: '23', //23
    loadChildren: () =>
      import('./twenty-three-uk-blog/twenty-three-uk-blog.module').then(
        (m) => m.TwentyThreeUkBlogModule
      ),
  },
  {
    path: '24', //24
    loadChildren: () =>
      import('./twenty-four-uk-blog/twenty-four-uk-blog.module').then(
        (m) => m.TwentyFourUkBlogModule
      ),
  },
  {
    path: '25', //25
    loadChildren: () =>
      import('./twenty-five-uk-blog/twenty-five-uk-blog.module').then(
        (m) => m.TwentyFiveUkBlogModule
      ),
  },
  {
    path: '26', //26
    loadChildren: () =>
      import('./twenty-six-uk-blog/twenty-six-uk-blog.module').then(
        (m) => m.TwentySixUkBlogModule
      ),
  },
  {
    path: '27', //27
    loadChildren: () =>
      import('./twenty-seven-uk-blog/twenty-seven-uk-blog.module').then(
        (m) => m.TwentySevenUkBlogModule
      ),
  },
  {
    path: '28', //28
    loadChildren: () =>
      import('./twenty-eight-uk-blog/twenty-eight-uk-blog.module').then(
        (m) => m.TwentyEightUkBlogModule
      ),
  },
  {
    path: '29', //29
    loadChildren: () =>
      import('./twenty-nine-uk-blog/twenty-nine-uk-blog.module').then(
        (m) => m.TwentyNineUkBlogModule
      ),
  },
  {
    path: '30', //30
    loadChildren: () =>
      import('./thirty-uk-blog/thirty-uk-blog.module').then(
        (m) => m.ThirtyUkBlogModule
      ),
  },
];

@NgModule({
  declarations: [UkBlogHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UkblogModule {}

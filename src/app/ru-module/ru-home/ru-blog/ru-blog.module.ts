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
    path: 'simpletradingsystem', //25
    loadChildren: () =>
      import('./twenty-five-ru-blog/twenty-five-ru-blog.module').then(
        (m) => m.TwentyFiveRuBlogModule
      ),
  },
  {
    path: 'ordertypes', //26
    loadChildren: () =>
      import('./twenty-six-ru-blog/twenty-six-ru-blog.module').then(
        (m) => m.TwentySixRuBlogModule
      ),
  },
  {
    path: 'japanesecandle', //27
    loadChildren: () =>
      import('./twenty-seven-ru-blog/twenty-seven-ru-blog.module').then(
        (m) => m.TwentySevenRuBlogModule
      ),
  },
  {
    path: 'smartmoneystrategy', //28
    loadChildren: () =>
      import('./twenty-eight-ru-blog/twenty-eight-ru-blog.module').then(
        (m) => m.TwentyEightRuBlogModule
      ),
  },
  {
    path: 'tradingquickstart', //29
    loadChildren: () =>
      import('./twenty-nine-ru-blog/twenty-nine-ru-blog.module').then(
        (m) => m.TwentyNineRuBlogModule
      ),
  },
  {
    path: 'cryptocurrencybasics', //30
    loadChildren: () =>
      import('./thirty-ru-blog/thirty-ru-blog.module').then(
        (m) => m.ThirtyRuBlogModule
      ),
  },
  {
    path: 'levelofsupport', //31
    loadChildren: () =>
      import('./thirty-one-ru-blog/thirty-one-ru-blog.module').then(
        (m) => m.ThirtyOneRuBlogModule
      ),
  },
  {
    path: 'purchasingcourses', //32
    loadChildren: () =>
      import('./thirty-two-ru-blog/thirty-two-ru-blog.module').then(
        (m) => m.ThirtyTwoRuBlogModule
      ),
  },
  {
    path: 'pinbar', //33
    loadChildren: () =>
      import('./thirty-three-ru-blog/thirty-three-ru-blog.module').then(
        (m) => m.ThirtyThreeRuBlogModule
      ),
  },
  {
    path: 'stoploss', //34
    loadChildren: () =>
      import('./thirty-four-ru-blog/thirty-four-ru-blog.module').then(
        (m) => m.ThirtyFourRuBlogModule
      ),
  },
  {
    path: 'tradingbasics', //35
    loadChildren: () =>
      import('./thirty-five-ru-blog/thirty-five-ru-blog.module').then(
        (m) => m.ThirtyFiveRuBlogModule
      ),
  },
  {
    path: 'cryptocurrencytrading', //36
    loadChildren: () =>
      import('./thirty-six-ru-blog/thirty-six-ru-blog.module').then(
        (m) => m.ThirtySixRuBlogModule
      ),
  },
  {
    path: 'drawdowns', //37
    loadChildren: () =>
      import('./thirty-seven-ru-blog/thirty-seven-ru-blog.module').then(
        (m) => m.ThirtySevenRuBlogModule
      ),
  },
  {
    path: 'smartmoneyconcept', //38
    loadChildren: () =>
      import('./thirty-eight-ru-blog/thirty-eight-ru-blog.module').then(
        (m) => m.ThirtyEightRuBlogModule
      ),
  },
  {
    path: 'volumetricmarketanalysis', //39
    loadChildren: () =>
      import('./thirty-nine-ru-blog/thirty-nine-ru-blog.module').then(
        (m) => m.ThirtyNineRuBlogModule
      ),
  },
  {
    path: 'difficulttrading', //40
    loadChildren: () =>
      import('./fourty-ru-blog/fourty-ru-blog.module').then(
        (m) => m.FourtyRuBlogModule
      ),
  },
  {
    path: 'successfultrading', //41
    loadChildren: () =>
      import('./fourty-one-ru-blog/fourty-one-ru-blog.module').then(
        (m) => m.FourtyOneRuBlogModule
      ),
  },
  {
    path: 'cryptocurrencyrisks', //42
    loadChildren: () =>
      import('./fourty-two-ru-blog/fourty-two-ru-blog.module').then(
        (m) => m.FourtyTwoRuBlogModule
      ),
  },
  {
    path: 'smartmoneystrategyforbanks', //43
    loadChildren: () =>
      import('./fourty-three-ru-blog/fourty-three-ru-blog.module').then(
        (m) => m.FourtyThreeRuBlogModule
      ),
  },
  {
    path: 'basicsoftrading', //44
    loadChildren: () =>
      import('./fourty-four-ru-blog/fourty-four-ru-blog.module').then(
        (m) => m.FourtyFourRuBlogModule
      ),
  },
  {
    path: 'movingaverages', //45
    loadChildren: () =>
      import('./fourty-five-ru-blog/fourty-five-ru-blog.module').then(
        (m) => m.FourtyFiveRuBlogModule
      ),
  },
  {
    path: 'freeeducation', //46
    loadChildren: () =>
      import('./fourty-six-ru-blog/fourty-six-ru-blog.module').then(
        (m) => m.FourtySixRuBlogModule
      ),
  },
  {
    path: '47', //47
    loadChildren: () =>
      import('./fourty-seven-ru-blog/fourty-seven-ru-blog.module').then(
        (m) => m.FourtySevenRuBlogModule
      ),
  },
  {
    path: '48', //48
    loadChildren: () =>
      import('./fourty-eight-ru-blog/fourty-eight-ru-blog.module').then(
        (m) => m.FourtyEightRuBlogModule
      ),
  },
  {
    path: '49', //49
    loadChildren: () =>
      import('./fourty-nine-ru-blog/fourty-nine-ru-blog.module').then(
        (m) => m.FourtyNineRuBlogModule
      ),
  },
  {
    path: '50', //50
    loadChildren: () =>
      import('./fifty-ru-blog/fifty-ru-blog.module').then(
        (m) => m.FiftyRuBlogModule
      ),
  },
];

@NgModule({
  declarations: [RuBlogHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RuBlogModule {}

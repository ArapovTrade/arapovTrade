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
    path: 'besttimefortrading', //20
    loadChildren: () =>
      import('./twenty-en-blog/twenty-en-blog.module').then(
        (m) => m.TwentyEnBlogModule
      ),
  },
  {
    path: 'marketmaker', //21
    loadChildren: () =>
      import('./twenty-one-en-blog/twenty-one-en-blog.module').then(
        (m) => m.TwentyOneEnBlogModule
      ),
  },
  {
    path: 'pricepatterns', //22
    loadChildren: () =>
      import('./twenty-two-en-blog/twenty-two-en-blog.module').then(
        (m) => m.TwentyTwoEnBlogModule
      ),
  },
  {
    path: 'liqudityintrading', //23
    loadChildren: () =>
      import('./twenty-three-en-blog/twenty-three-en-blog.module').then(
        (m) => m.TwentyThreeEnBlogModule
      ),
  },
  {
    path: 'flagfigure', //24
    loadChildren: () =>
      import('./twenty-four-en-blog/twenty-four-en-blog.module').then(
        (m) => m.TwentyFourEnBlogModule
      ),
  },
  {
    path: 'simpletradingsystem', //25
    loadChildren: () =>
      import('./twenty-five-en-blog/twenty-five-en-blog.module').then(
        (m) => m.TwentyFiveEnBlogModule
      ),
  },
  {
    path: 'ordertypes', //26
    loadChildren: () =>
      import('./twenty-six-en-blog/twenty-six-en-blog.module').then(
        (m) => m.TwentySixEnBlogModule
      ),
  },
  {
    path: 'japanesecandle', //27
    loadChildren: () =>
      import('./twenty-seven-en-blog/twenty-seven-en-blog.module').then(
        (m) => m.TwentySevenEnBlogModule
      ),
  },
  {
    path: 'smartmoneystrategy', //28
    loadChildren: () =>
      import('./twenty-eight-en-blog/twenty-eight-en-blog.module').then(
        (m) => m.TwentyEightEnBlogModule
      ),
  },
  {
    path: 'tradingquickstart', //29
    loadChildren: () =>
      import('./twenty-nine-en-blog/twenty-nine-en-blog.module').then(
        (m) => m.TwentyNineEnBlogModule
      ),
  },
  {
    path: 'cryptocurrencybasics', //30
    loadChildren: () =>
      import('./thirty-en-blog/thirty-en-blog.module').then(
        (m) => m.ThirtyEnBlogModule
      ),
  },
  {
    path: 'levelofsupport', //31
    loadChildren: () =>
      import('./thirty-one-eu-blog/thirty-one-eu-blog.module').then(
        (m) => m.ThirtyOneEuBlogModule
      ),
  },
  {
    path: 'purchasingcourses', //32
    loadChildren: () =>
      import('./thirty-two-eu-blog/thirty-two-eu-blog.module').then(
        (m) => m.ThirtyTwoEuBlogModule
      ),
  },
  {
    path: 'pinbar', //33
    loadChildren: () =>
      import('./thirty-three-eu-blog/thirty-three-eu-blog.module').then(
        (m) => m.ThirtyThreeEuBlogModule
      ),
  },
  {
    path: 'stoploss', //34
    loadChildren: () =>
      import('./thirty-four-eu-blog/thirty-four-eu-blog.module').then(
        (m) => m.ThirtyFourEuBlogModule
      ),
  },
  {
    path: 'tradingbasics', //35
    loadChildren: () =>
      import('./thirty-five-eu-blog/thirty-five-eu-blog.module').then(
        (m) => m.ThirtyFiveEuBlogModule
      ),
  },
  {
    path: 'cryptocurrencytrading', //36
    loadChildren: () =>
      import('./thirty-six-eu-blog/thirty-six-eu-blog.module').then(
        (m) => m.ThirtySixEuBlogModule
      ),
  },
  {
    path: 'drawdowns', //37
    loadChildren: () =>
      import('./thirty-seven-eu-blog/thirty-seven-eu-blog.module').then(
        (m) => m.ThirtySevenEuBlogModule
      ),
  },
  {
    path: 'smartmoneyconcept', //38
    loadChildren: () =>
      import('./thirty-eight-eu-blog/thirty-eight-eu-blog.module').then(
        (m) => m.ThirtyEightEuBlogModule
      ),
  },
  {
    path: 'volumetricmarketanalysis', //39
    loadChildren: () =>
      import('./thirty-nine-eu-blog/thirty-nine-eu-blog.module').then(
        (m) => m.ThirtyNineEuBlogModule
      ),
  },
  {
    path: 'difficulttrading', //40
    loadChildren: () =>
      import('./fourty-eu-blog/fourty-eu-blog.module').then(
        (m) => m.FourtyEuBlogModule
      ),
  },
  {
    path: 'successfultrading', //41
    loadChildren: () =>
      import('./fourty-one-en-blog/fourty-one-en-blog.module').then(
        (m) => m.FourtyOneEnBlogModule
      ),
  },
  {
    path: 'cryptocurrencyrisks', //42
    loadChildren: () =>
      import('./fourty-two-en-blog/fourty-two-en-blog.module').then(
        (m) => m.FourtyTwoEnBlogModule
      ),
  },
  {
    path: 'smartmoneystrategyforbanks', //43
    loadChildren: () =>
      import('./fourty-three-en-blog/fourty-three-en-blog.module').then(
        (m) => m.FourtyThreeEnBlogModule
      ),
  },
  {
    path: 'basicsoftrading', //44
    loadChildren: () =>
      import('./fourty-four-en-blog/fourty-four-en-blog.module').then(
        (m) => m.FourtyFourEnBlogModule
      ),
  },
  {
    path: 'movingaverages', //45
    loadChildren: () =>
      import('./fourty-five-en-blog/fourty-five-en-blog.module').then(
        (m) => m.FourtyFiveEnBlogModule
      ),
  },
  {
    path: 'freeeducation', //46
    loadChildren: () =>
      import('./fourty-six-en-blog/fourty-six-en-blog.module').then(
        (m) => m.FourtySixEnBlogModule
      ),
  },
  {
    path: 'fundamentalanalysis', //47
    loadChildren: () =>
      import('./fourty-seven-en-blog/fourty-seven-en-blog.module').then(
        (m) => m.FourtySevenEnBlogModule
      ),
  },
  {
    path: 'selfstudying', //48
    loadChildren: () =>
      import('./fourty-eight-en-blog/fourty-eight-en-blog.module').then(
        (m) => m.FourtyEightEnBlogModule
      ),
  },
  {
    path: 'choosingtradingplatform', //49
    loadChildren: () =>
      import('./fourty-nine-en-blog/fourty-nine-en-blog.module').then(
        (m) => m.FourtyNineEnBlogModule
      ),
  },
  {
    path: 'algorithmicorders', //50
    loadChildren: () =>
      import('./fifty-en-blog/fifty-en-blog.module').then(
        (m) => m.FiftyEnBlogModule
      ),
  },
  {
    path: 'candlestickpatterns', //51
    loadChildren: () =>
      import('./fifty-one-eu-blog/fifty-one-eu-blog.module').then(
        (m) => m.FiftyOneEuBlogModule
      ),
  },
  {
    path: 'anatomyofmarkettrends', //52
    loadChildren: () =>
      import('./fifty-two-eu-blog/fifty-two-eu-blog.module').then(
        (m) => m.FiftyTwoEuBlogModule
      ),
  },
  {
    path: 'orderblockintrading', //53
    loadChildren: () =>
      import('./fifty-three-eu-blog/fifty-three-eu-blog.module').then(
        (m) => m.FiftyThreeEuBlogModule
      ),
  },
  {
    path: 'featuresofcrypto', //54
    loadChildren: () =>
      import('./fifty-four-eu-blog/fifty-four-eu-blog.module').then(
        (m) => m.FiftyFourEuBlogModule
      ),
  },
  {
    path: '55', //55
    loadChildren: () =>
      import('./fifty-five-eu-blog/fifty-five-eu-blog.module').then(
        (m) => m.FiftyFiveEuBlogModule
      ),
  },
  {
    path: '56', //56
    loadChildren: () =>
      import('./fifty-six-eu-blog/fifty-six-eu-blog.module').then(
        (m) => m.FiftySixEuBlogModule
      ),
  },
  {
    path: '57', //57
    loadChildren: () =>
      import('./fifty-seven-eu-blog/fifty-seven-eu-blog.module').then(
        (m) => m.FiftySevenEuBlogModule
      ),
  },
  {
    path: '58', //58
    loadChildren: () =>
      import('./fifty-eight-eu-blog/fifty-eight-eu-blog.module').then(
        (m) => m.FiftyEightEuBlogModule
      ),
  },
  {
    path: '59', //59
    loadChildren: () =>
      import('./fifty-nine-eu-blog/fifty-nine-eu-blog.module').then(
        (m) => m.FiftyNineEuBlogModule
      ),
  },
  {
    path: '60', //60
    loadChildren: () =>
      import('./sixty-eu-blog/sixty-eu-blog.module').then(
        (m) => m.SixtyEuBlogModule
      ),
  },
];

@NgModule({
  declarations: [EnBlogHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EuBlogModule {}

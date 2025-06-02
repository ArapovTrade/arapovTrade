import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuBlogHomepageComponent } from './ru-blog-homepage/ru-blog-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
 
import { MatExpansionModule } from '@angular/material/expansion';
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
    path: 'avoidlosingmoney',
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
    path: 'wyckoffmethod', //19
    loadChildren: () =>
      import('./nineteen-ru-blog/nineteen-ru-blog.module').then(
        (m) => m.NineteenRuBlogModule
      ),
  },
  {
    path: 'cryptoscam', //20
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
    path: 'cryptoarbitrage', //22
    loadChildren: () =>
      import('./twenty-two-ru-blog/twenty-two-ru-blog.module').then(
        (m) => m.TwentyTwoRuBlogModule
      ),
  },
  {
    path: 'bitcoinetf', //23
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
    path: 'cryptommakers', //25
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
    path: 'altblockchains', //28
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
    path: 'cryptostoring', //38
    loadChildren: () =>
      import('./thirty-eight-ru-blog/thirty-eight-ru-blog.module').then(
        (m) => m.ThirtyEightRuBlogModule
      ),
  },
  {
    path: 'safetostorecrypto', //39
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
    path: 'cryptomarketanalysis', //43
    loadChildren: () =>
      import('./fourty-three-ru-blog/fourty-three-ru-blog.module').then(
        (m) => m.FourtyThreeRuBlogModule
      ),
  },
  {
    path: 'cryptostaking', //44
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
    path: 'pizzaday', //46
    loadChildren: () =>
      import('./fourty-six-ru-blog/fourty-six-ru-blog.module').then(
        (m) => m.FourtySixRuBlogModule
      ),
  },
  {
    path: 'fundamentalanalysis', //47
    loadChildren: () =>
      import('./fourty-seven-ru-blog/fourty-seven-ru-blog.module').then(
        (m) => m.FourtySevenRuBlogModule
      ),
  },
  {
    path: 'selfstudying', //48
    loadChildren: () =>
      import('./fourty-eight-ru-blog/fourty-eight-ru-blog.module').then(
        (m) => m.FourtyEightRuBlogModule
      ),
  },
  {
    path: 'choosingtradingplatform', //49
    loadChildren: () =>
      import('./fourty-nine-ru-blog/fourty-nine-ru-blog.module').then(
        (m) => m.FourtyNineRuBlogModule
      ),
  },
  {
    path: 'algorithmicorders', //50
    loadChildren: () =>
      import('./fifty-ru-blog/fifty-ru-blog.module').then(
        (m) => m.FiftyRuBlogModule
      ),
  },
  {
    path: 'candlestickpatterns', //51
    loadChildren: () =>
      import('./fifty-one-ru-blog/fifty-one-ru-blog.module').then(
        (m) => m.FiftyOneRuBlogModule
      ),
  },
  {
    path: 'anatomyofmarkettrends', //52
    loadChildren: () =>
      import('./fifty-two-ru-blog/fifty-two-ru-blog.module').then(
        (m) => m.FiftyTwoRuBlogModule
      ),
  },
  {
    path: 'orderblockintrading', //53
    loadChildren: () =>
      import('./fifty-three-ru-blog/fifty-three-ru-blog.module').then(
        (m) => m.FiftyThreeRuBlogModule
      ),
  },
  {
    path: 'cryptosafe', //54
    loadChildren: () =>
      import('./fifty-four-ru-blog/fifty-four-ru-blog.module').then(
        (m) => m.FiftyFourRuBlogModule
      ),
  },
  {
    path: 'scalpingintrading', //55
    loadChildren: () =>
      import('./fifty-five-ru-blog/fifty-five-ru-blog.module').then(
        (m) => m.FiftyFiveRuBlogModule
      ),
  },
  {
    path: 'benefitsoftradingbooks', //56
    loadChildren: () =>
      import('./fifty-six-ru-blog/fifty-six-ru-blog.module').then(
        (m) => m.FiftySixRuBlogModule
      ),
  },
  {
    path: 'tradingindicators', //57
    loadChildren: () =>
      import('./fifty-seven-ru-blog/fifty-seven-ru-blog.module').then(
        (m) => m.FiftySevenRuBlogModule
      ),
  },
  {
    path: 'averagingintrading', //58
    loadChildren: () =>
      import('./fifty-eight-ru-blog/fifty-eight-ru-blog.module').then(
        (m) => m.FiftyEightRuBlogModule
      ),
  },
  {
    path: 'levelbreakoutstrategy', //59
    loadChildren: () =>
      import('./fifty-nine-ru-blog/fifty-nine-ru-blog.module').then(
        (m) => m.FiftyNineRuBlogModule
      ),
  },
  {
    path: 'tradingvsoptions', //60
    loadChildren: () =>
      import('./sixty-ru-blog/sixty-ru-blog.module').then(
        (m) => m.SixtyRuBlogModule
      ),
  },
  {
    path: 'adviceforbeginners',
    loadChildren: () =>
      import('../ru-trading/one-ru-article/one-ru-article.module').then(
        (m) => m.OneRUArticleModule
      ),
  },

  {
    path: 'marketbasics',
    loadChildren: () =>
      import('../ru-trading/two-ru-article/two-ru-article.module').then(
        (m) => m.TwoRuArticleModule
      ),
  },
  {
    path: 'exchange',
    loadChildren: () =>
      import('../ru-trading/three-ru-article/three-ru-article.module').then(
        (m) => m.ThreeRuArticleModule
      ),
  },
  {
    path: 'exchangemarket',
    loadChildren: () =>
      import('../ru-trading/four-ru-article/four-ru-article.module').then(
        (m) => m.FourRuArticleModule
      ),
  },
  {
    path: 'derivatives',
    loadChildren: () =>
      import('../ru-trading/five-ru-article/five-ru-article.module').then(
        (m) => m.FiveRuArticleModule
      ),
  },
  {
    path: 'stablecoins',
    loadChildren: () =>
      import('../ru-trading/six-ru-article/six-ru-article.module').then(
        (m) => m.SixRuArticleModule
      ),
  },
  {
    path: 'forexmarket',
    loadChildren: () =>
      import('../ru-trading/seven-ru-article/seven-ru-article.module').then(
        (m) => m.SevenRuArticleModule
      ),
  },
  {
    path: 'currenciesandquotes',
    loadChildren: () =>
      import('../ru-trading/eight-ru-article/eight-ru-article.module').then(
        (m) => m.EightRuArticleModule
      ),
  },
  {
    path: 'formationexchange',
    loadChildren: () =>
      import('../ru-trading/nine-ru-article/nine-ru-article.module').then(
        (m) => m.NineRuArticleModule
      ),
  },

  {
    path: 'currencyposition',
    loadChildren: () =>
      import('../ru-trading/ten-ru-artickle/ten-ru-artickle.module').then(
        (m) => m.TenRuArtickleModule
      ),
  },
  {
    path: 'cryptostart',
    loadChildren: () =>
      import('../ru-trading/eleven-ru-artickle/eleven-ru-artickle.module').then(
        (m) => m.ElevenRuArtickleModule
      ),
  },
  {
    path: 'halving',
    loadChildren: () =>
      import('../ru-trading/twelve-ru-artickle/twelve-ru-artickle.module').then(
        (m) => m.TwelveRuArtickleModule
      ),
  },
  {
    path: 'riskcurrencyexchange',
    loadChildren: () =>
      import(
        '../ru-trading/thirteen-ru-artickle/thirteen-ru-artickle.module'
      ).then((m) => m.ThirteenRuArtickleModule),
  },
  {
    path: 'forexleveragerisk',
    loadChildren: () =>
      import(
        '../ru-trading/fourteen-ru-artickle/fourteen-ru-artickle.module'
      ).then((m) => m.FourteenRuArtickleModule),
  },
  {
    path: 'majorbankfrs',
    loadChildren: () =>
      import(
        '../ru-trading/fifteen-ru-artickle/fifteen-ru-artickle.module'
      ).then((m) => m.FifteenRuArtickleModule),
  },
  {
    path: 'ethereum',
    loadChildren: () =>
      import(
        '../ru-trading/sixteen-ru-artickle/sixteen-ru-artickle.module'
      ).then((m) => m.SixteenRuArtickleModule),
  },
  {
    path: 'bitcoin',
    loadChildren: () =>
      import(
        '../ru-trading/seventeen-ru-artickle/seventeen-ru-artickle.module'
      ).then((m) => m.SeventeenRuArtickleModule),
  },
  {
    path: 'psychorisks',
    loadChildren: () =>
      import(
        '../ru-trading/eighteen-ru-artickle/eighteen-ru-artickle.module'
      ).then((m) => m.EighteenRuArtickleModule),
  },
  {
    path: 'howtotradeonforex',
    loadChildren: () =>
      import(
        '../ru-trading/nineteen-ru-artickle/nineteen-ru-artickle.module'
      ).then((m) => m.NineteenRuArtickleModule),
  },
  {
    path: 'steidlmayeranalysis',
    loadChildren: () =>
      import('../ru-trading/twenty-ru-artickle/twenty-ru-artickle.module').then(
        (m) => m.TwentyRuArtickleModule
      ),
  },
  {
    path: 'marketanalysisforex',
    loadChildren: () =>
      import(
        '../ru-trading/twenty-one-ru-artickle/twenty-one-ru-artickle.module'
      ).then((m) => m.TwentyOneRuArtickleModule),
  },
  {
    path: 'econimicfactors',
    loadChildren: () =>
      import(
        '../ru-trading/twenty-two-ru-artickle/twenty-two-ru-artickle.module'
      ).then((m) => m.TwentyTwoRuArtickleModule),
  },
  {
    path: 'worldstockindicates',
    loadChildren: () =>
      import(
        '../ru-trading/twenty-three-ru-artickle/twenty-three-ru-artickle.module'
      ).then((m) => m.TwentyThreeRuArtickleModule),
  },
  {
    path: 'fibonaccilevels',
    loadChildren: () =>
      import(
        '../ru-trading/twenty-four-ru-artickle/twenty-four-ru-artickle.module'
      ).then((m) => m.TwentyFourRuArtickleModule),
  },
  {
    path: 'keyeconomicgrowth',
    loadChildren: () =>
      import(
        '../ru-trading/twenty-five-ru-artickle/twenty-five-ru-artickle.module'
      ).then((m) => m.TwentyFiveRuArtickleModule),
  },
  {
    path: 'technicalanalysis',
    loadChildren: () =>
      import(
        '../ru-trading/twenty-six-ru-artickle/twenty-six-ru-artickle.module'
      ).then((m) => m.TwentySixRuArtickleModule),
  },
  {
    path: 'technicalmarketcharts',
    loadChildren: () =>
      import(
        '../ru-trading/twenty-seven-ru-artickle/twenty-seven-ru-artickle.module'
      ).then((m) => m.TwentySevenRuArtickleModule),
  },
  {
    path: 'keypricepattern',
    loadChildren: () =>
      import(
        '../ru-trading/twenty-eight-ru-artickle/twenty-eight-ru-artickle.module'
      ).then((m) => m.TwentyEightRuArtickleModule),
  },
  {
    path: 'smartmonettraps',
    loadChildren: () =>
      import(
        '../ru-trading/twenty-nine-ru-artickle/twenty-nine-ru-artickle.module'
      ).then((m) => m.TwentyNineRuArtickleModule),
  },
  {
    path: 'imbalanceandfvg',
    loadChildren: () =>
      import('../ru-trading/thirty-ru-artickle/thirty-ru-artickle.module').then(
        (m) => m.ThirtyRuArtickleModule
      ),
  },
  {
    path: 'marketorder',
    loadChildren: () =>
      import(
        '../ru-trading/thirty-one-ru-artickle/thirty-one-ru-artickle.module'
      ).then((m) => m.ThirtyOneRuArtickleModule),
  },
  {
    path: 'stoporder',
    loadChildren: () =>
      import(
        '../ru-trading/thirty-two-ru-artickle/thirty-two-ru-artickle.module'
      ).then((m) => m.ThirtyTwoRuArtickleModule),
  },
  {
    path: 'requotes',
    loadChildren: () =>
      import(
        '../ru-trading/thirty-three-ru-artickle/thirty-three-ru-artickle.module'
      ).then((m) => m.ThirtyThreeRuArtickleModule),
  },
  {
    path: 'stoplimitorder',
    loadChildren: () =>
      import(
        '../ru-trading/thirty-four-ru-artickle/thirty-four-ru-artickle.module'
      ).then((m) => m.ThirtyFourRuArtickleModule),
  },
  {
    path: 'tradingsystem',
    loadChildren: () =>
      import(
        '../ru-trading/thirty-five-ru-artickle/thirty-five-ru-artickle.module'
      ).then((m) => m.ThirtyFiveRuArtickleModule),
  },
  {
    path: 'falsebreakouts',
    loadChildren: () =>
      import(
        '../ru-trading/thirty-six-ru-artickle/thirty-six-ru-artickle.module'
      ).then((m) => m.ThirtySixRuArtickleModule),
  },
  {
    path: 'stophunting',
    loadChildren: () =>
      import(
        '../ru-trading/thirty-seven-ru-artickle/thirty-seven-ru-artickle.module'
      ).then((m) => m.ThirtySevenRuArtickleModule),
  },
  {
    path: 'capitalmanagement',
    loadChildren: () =>
      import(
        '../ru-trading/thirty-eight-ru-artickle/thirty-eight-ru-artickle.module'
      ).then((m) => m.ThirtyEightRuArtickleModule),
  },
  {
    path: 'profitandlossratio',
    loadChildren: () =>
      import(
        '../ru-trading/thirty-nine-ru-artickle/thirty-nine-ru-artickle.module'
      ).then((m) => m.ThirtyNineRuArtickleModule),
  },
  {
    path: 'beginnermistakes',
    loadChildren: () =>
      import('../ru-trading/fourty-ru-artickle/fourty-ru-artickle.module').then(
        (m) => m.FourtyRuArtickleModule
      ),
  },
  {
    path: 'tradingplan',
    loadChildren: () =>
      import(
        '../ru-trading/fourty-one-ru-artickle/fourty-one-ru-artickle.module'
      ).then((m) => m.FourtyOneRuArtickleModule),
  },
  {
    path: 'timeframes',
    loadChildren: () =>
      import(
        '../ru-trading/fourty-two-ru-artickle/fourty-two-ru-artickle.module'
      ).then((m) => m.FourtyTwoRuArtickleModule),
  },
  {
    path: 'liquiditypools',
    loadChildren: () =>
      import(
        '../ru-trading/fourty-three-ru-artickle/fourty-three-ru-artickle.module'
      ).then((m) => m.FourtyThreeRuArtickleModule),
  },
  {
    path: 'icebergorders',
    loadChildren: () =>
      import(
        '../ru-trading/fourty-four-ru-artickle/fourty-four-ru-artickle.module'
      ).then((m) => m.FourtyFourRuArtickleModule),
  },
  {
    path: 'freeeducation',
    loadChildren: () =>
      import(
        '../ru-trading/fourty-five-ru-artickle/fourty-five-ru-artickle.module'
      ).then((m) => m.FourtyFiveRuArtickleModule),
  },
  {
    path: 'cryptotether',
    loadChildren: () =>
      import(
        '../ru-trading/fourty-six-ru-artickle/fourty-six-ru-artickle.module'
      ).then((m) => m.FourtySixRuArtickleModule),
  },

  {
    path: 'smartmoneyconceptsguide', //61
    loadChildren: () =>
      import('../ru-blog/sixty-one-ru-blog/sixty-one-ru-blog.module').then(
        (m) => m.SixtyOneRuBlogModule
      ),
  },
  {
    path: 'smartmoneystrategies', //62
    loadChildren: () =>
      import('../ru-blog/sixty-two-ru-blog/sixty-two-ru-blog.module').then(
        (m) => m.SixtyTwoRuBlogModule
      ),
  },
  {
    path: 'smartmoneycontrol', //63
    loadChildren: () =>
      import('../ru-blog/sixty-three-ru-blog/sixty-three-ru-blog.module').then(
        (m) => m.SixtyThreeRuBlogModule
      ),
  },
  {
    path: 'practic', //64
    loadChildren: () =>
      import('../ru-blog/sixty-four-ru-blog/sixty-four-ru-blog.module').then(
        (m) => m.SixtyFourRuBlogModule
      ),
  },
  {
    path: 'stockorderbook', //65
    loadChildren: () =>
      import('../ru-blog/sixty-five-ru-blog/sixty-five-ru-blog.module').then(
        (m) => m.SixtyFiveRuBlogModule
      ),
  },
  {
    path: 'peakvolumelevels', //66
    loadChildren: () =>
      import('../ru-blog/sixty-six-ru-blog/sixty-six-ru-blog.module').then(
        (m) => m.SixtySixRuBlogModule
      ),
  },
  {
    path: 'trendvolumeanalysis', //67
    loadChildren: () =>
      import('../ru-blog/sixty-seven-ru-blog/sixty-seven-ru-blog.module').then(
        (m) => m.SixtySevenRuBlogModule
      ),
  },
  {
    path: 'marketauctiondevelops', //68
    loadChildren: () =>
      import('../ru-blog/sixty-eight-ru-blog/sixty-eight-ru-blog.module').then(
        (m) => m.SixtyEightRuBlogModule
      ),
  },
  {
    path: 'volumeandfuturesmarket', //69
    loadChildren: () =>
      import('../ru-blog/sixty-nine-ru-blog/sixty-nine-ru-blog.module').then(
        (m) => m.SixtyNineRuBlogModule
      ),
  },
  {
    path: 'wyckoffsvolumeconcept', //70
    loadChildren: () =>
      import('../ru-blog/seventy-ru-blog/seventy-ru-blog.module').then(
        (m) => m.SeventyRuBlogModule
      ),
  },
  {
    path: 'newstrading', //71
    loadChildren: () =>
      import('../ru-blog/seventy-one-ru-blog/seventy-one-ru-blog.module').then(
        (m) => m.SeventyOneRuBlogModule
      ),
  },
  {
    path: 'economiccalendar', //72
    loadChildren: () =>
      import('../ru-blog/seventy-two-ru-blog/seventy-two-ru-blog.module').then(
        (m) => m.SeventyTwoRuBlogModule
      ),
  },
  {
    path: 'macroeconomicindicators', //73
    loadChildren: () =>
      import(
        '../ru-blog/seventy-three-ru-blog/seventy-three-ru-blog.module'
      ).then((m) => m.SeventyThreeRuBlogModule),
  },
  {
    path: 'globalfundamentalanalysis', //74
    loadChildren: () =>
      import(
        '../ru-blog/seventy-four-ru-blog/seventy-four-ru-blog.module'
      ).then((m) => m.SeventyFourRuBlogModule),
  },
  {
    path: 'gamblingorbusiness', //75
    loadChildren: () =>
      import(
        '../ru-blog/seventy-five-ru-blog/seventy-five-ru-blog.module'
      ).then((m) => m.SeventyFiveRuBlogModule),
  },
  {
    path: 'williamgannpsychology', //76
    loadChildren: () =>
      import('../ru-blog/seventy-six-ru-blog/seventy-six-ru-blog.module').then(
        (m) => m.SeventySixRuBlogModule
      ),
  },
  {
    path: 'emotionsaffect', //77
    loadChildren: () =>
      import(
        '../ru-blog/seventy-seven-ru-blog/seventy-seven-ru-blog.module'
      ).then((m) => m.SeventySevenRuBlogModule),
  },
  {
    path: 'fomo', //78
    loadChildren: () =>
      import(
        '../ru-blog/seventy-eight-ru-blog/seventy-eight-ru-blog.module'
      ).then((m) => m.SeventyEightRuBlogModule),
  },
  {
    path: 'psychologyofaveraging', //79
    loadChildren: () =>
      import(
        '../ru-blog/seventy-nine-ru-blog/seventy-nine-ru-blog.module'
      ).then((m) => m.SeventyNineRuBlogModule),
  },
  {
    path: 'headandshoulders', //80
    loadChildren: () =>
      import('../ru-blog/eighty-ru-blog/eighty-ru-blog.module').then(
        (m) => m.EightyRuBlogModule
      ),
  },
  {
    path: 'trianglefigure', //81
    loadChildren: () =>
      import('../ru-blog/eighty-one-ru-blog/eighty-one-ru-blog.module').then(
        (m) => m.EightyOneRuBlogModule
      ),
  },
  {
    path: 'flagandpennant', //82
    loadChildren: () =>
      import('../ru-blog/eighty-two-ru-blog/eighty-two-ru-blog.module').then(
        (m) => m.EightyTwoRuBlogModule
      ),
  },
  {
    path: 'cupandhandle', //83
    loadChildren: () =>
      import(
        '../ru-blog/eighty-three-ru-blog/eighty-three-ru-blog.module'
      ).then((m) => m.EightyThreeRuBlogModule),
  },
  {
    path: 'engulfing', //84
    loadChildren: () =>
      import('../ru-blog/eighty-four-ru-blog/eighty-four-ru-blog.module').then(
        (m) => m.EightyFourRuBlogModule
      ),
  },
  {
    path: 'doubletopandbottom', //85
    loadChildren: () =>
      import('../ru-blog/eighty-five-ru-blog/eighty-five-ru-blog.module').then(
        (m) => m.EightyFiveRuBlogModule
      ),
  },
  {
    path: 'pattern-1-2-3', //86
    loadChildren: () =>
      import('../ru-blog/eighty-six-ru-blog/eighty-six-ru-blog.module').then(
        (m) => m.EightySixRuBlogModule
      ),
  },
  // {
  //   path: 'headandshoulders', //87
  //   loadChildren: () =>
  //     import(
  //       '../ru-blog/eighty-seven-ru-blog/eighty-seven-ru-blog.module'
  //     ).then((m) => m.EightySevenRuBlogModule),
  // },
];

@NgModule({
  declarations: [RuBlogHomepageComponent],
  imports: [CommonModule, MatExpansionModule, MatPaginatorModule, RouterModule.forChild(routes)],
})
export class RuBlogModule {}

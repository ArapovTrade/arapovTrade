import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnBlogHomepageComponent } from './en-blog-homepage/en-blog-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

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
    path: 'avoidlosingmoney',
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
    path: 'wyckoffmethod', //19
    loadChildren: () =>
      import('./nineteen-en-blog/nineteen-en-blog.module').then(
        (m) => m.NineteenEnBlogModule
      ),
  },
  {
    path: 'cryptoscam', //20
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
    path: 'cryptoarbitrage', //22
    loadChildren: () =>
      import('./twenty-two-en-blog/twenty-two-en-blog.module').then(
        (m) => m.TwentyTwoEnBlogModule
      ),
  },
  {
    path: 'bitcoinetf', //23
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
    path: 'cryptommakers', //25
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
    path: 'altblockchains', //28
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
    path: 'cryptostoring', //38
    loadChildren: () =>
      import('./thirty-eight-eu-blog/thirty-eight-eu-blog.module').then(
        (m) => m.ThirtyEightEuBlogModule
      ),
  },
  {
    path: 'safetostorecrypto', //39
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
    path: 'cryptomarketanalysis', //43
    loadChildren: () =>
      import('./fourty-three-en-blog/fourty-three-en-blog.module').then(
        (m) => m.FourtyThreeEnBlogModule
      ),
  },
  {
    path: 'cryptostaking', //44
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
    path: 'pizzaday', //46
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
    path: 'cryptosafe', //54
    loadChildren: () =>
      import('./fifty-four-eu-blog/fifty-four-eu-blog.module').then(
        (m) => m.FiftyFourEuBlogModule
      ),
  },
  {
    path: 'scalpingintrading', //55
    loadChildren: () =>
      import('./fifty-five-eu-blog/fifty-five-eu-blog.module').then(
        (m) => m.FiftyFiveEuBlogModule
      ),
  },
  {
    path: 'benefitsoftradingbooks', //56
    loadChildren: () =>
      import('./fifty-six-eu-blog/fifty-six-eu-blog.module').then(
        (m) => m.FiftySixEuBlogModule
      ),
  },
  {
    path: 'tradingindicators', //57
    loadChildren: () =>
      import('./fifty-seven-eu-blog/fifty-seven-eu-blog.module').then(
        (m) => m.FiftySevenEuBlogModule
      ),
  },
  {
    path: 'averagingintrading', //58
    loadChildren: () =>
      import('./fifty-eight-eu-blog/fifty-eight-eu-blog.module').then(
        (m) => m.FiftyEightEuBlogModule
      ),
  },
  {
    path: 'levelbreakoutstrategy', //59
    loadChildren: () =>
      import('./fifty-nine-eu-blog/fifty-nine-eu-blog.module').then(
        (m) => m.FiftyNineEuBlogModule
      ),
  },
  {
    path: 'tradingvsoptions', //60
    loadChildren: () =>
      import('./sixty-eu-blog/sixty-eu-blog.module').then(
        (m) => m.SixtyEuBlogModule
      ),
  },
  {
    path: 'adviceforbeginners',
    loadChildren: () =>
      import('../en-trading/one-en-article/one-en-article.module').then(
        (m) => m.OneEnArticleModule
      ),
  },
  {
    path: 'marketbasics',
    loadChildren: () =>
      import('../en-trading/two-en-article/two-en-article.module').then(
        (m) => m.TwoEnArticleModule
      ),
  },
  {
    path: 'exchange',
    loadChildren: () =>
      import('../en-trading/three-en-article/three-en-article.module').then(
        (m) => m.ThreeEnArticleModule
      ),
  },
  {
    path: 'exchangemarket',
    loadChildren: () =>
      import('../en-trading/four-en-article/four-en-article.module').then(
        (m) => m.FourEnArticleModule
      ),
  },
  {
    path: 'derivatives',
    loadChildren: () =>
      import('../en-trading/five-en-article/five-en-article.module').then(
        (m) => m.FiveEnArticleModule
      ),
  },
  {
    path: 'stablecoins',
    loadChildren: () =>
      import('../en-trading/six-en-article/six-en-article.module').then(
        (m) => m.SixEnArticleModule
      ),
  },
  {
    path: 'forexmarket',
    loadChildren: () =>
      import('../en-trading/seven-en-article/seven-en-article.module').then(
        (m) => m.SevenEnArticleModule
      ),
  },
  {
    path: 'currenciesandquotes',
    loadChildren: () =>
      import('../en-trading/eight-en-article/eight-en-article.module').then(
        (m) => m.EightEnArticleModule
      ),
  },
  {
    path: 'formationexchange',
    loadChildren: () =>
      import('../en-trading/nine-en-artickle/nine-en-artickle.module').then(
        (m) => m.NineEnArtickleModule
      ),
  },

  {
    path: 'currencyposition',
    loadChildren: () =>
      import('../en-trading/ten-en-artickle/ten-en-artickle.module').then(
        (m) => m.TenEnArtickleModule
      ),
  },
  {
    path: 'cryptostart',
    loadChildren: () =>
      import('../en-trading/eleven-en-artickle/eleven-en-artickle.module').then(
        (m) => m.ElevenEnArtickleModule
      ),
  },
  {
    path: 'halving',
    loadChildren: () =>
      import('../en-trading/twelve-en-artickle/twelve-en-artickle.module').then(
        (m) => m.TwelveEnArtickleModule
      ),
  },
  {
    path: 'riskcurrencyexchange',
    loadChildren: () =>
      import(
        '../en-trading/thirteen-en-artickle/thirteen-en-artickle.module'
      ).then((m) => m.ThirteenEnArtickleModule),
  },
  {
    path: 'forexleveragerisk',
    loadChildren: () =>
      import(
        '../en-trading/fourteen-en-artickle/fourteen-en-artickle.module'
      ).then((m) => m.FourteenEnArtickleModule),
  },
  {
    path: 'majorbankfrs',
    loadChildren: () =>
      import(
        '../en-trading/fifteen-en-artickle/fifteen-en-artickle.module'
      ).then((m) => m.FifteenEnArtickleModule),
  },
  {
    path: 'ethereum',
    loadChildren: () =>
      import(
        '../en-trading/sixteen-en-artickle/sixteen-en-artickle.module'
      ).then((m) => m.SixteenEnArtickleModule),
  },
  {
    path: 'bitcoin',
    loadChildren: () =>
      import(
        '../en-trading/seventeen-en-artickle/seventeen-en-artickle.module'
      ).then((m) => m.SeventeenEnArtickleModule),
  },
  {
    path: 'psychorisks',
    loadChildren: () =>
      import(
        '../en-trading/eighteen-en-artickle/eighteen-en-artickle.module'
      ).then((m) => m.EighteenEnArtickleModule),
  },
  {
    path: 'howtotradeonforex',
    loadChildren: () =>
      import(
        '../en-trading/nineteen-en-artickle/nineteen-en-artickle.module'
      ).then((m) => m.NineteenEnArtickleModule),
  },
  {
    path: 'steidlmayeranalysis',
    loadChildren: () =>
      import('../en-trading/twenty-en-artickle/twenty-en-artickle.module').then(
        (m) => m.TwentyEnArtickleModule
      ),
  },
  {
    path: 'marketanalysisforex',
    loadChildren: () =>
      import(
        '../en-trading/twenty-one-en-artickle/twenty-one-en-artickle.module'
      ).then((m) => m.TwentyOneEnArtickleModule),
  },
  {
    path: 'econimicfactors',
    loadChildren: () =>
      import(
        '../en-trading/twenty-two-en-artickle/twenty-two-en-artickle.module'
      ).then((m) => m.TwentyTwoEnArtickleModule),
  },
  {
    path: 'worldstockindicates',
    loadChildren: () =>
      import(
        '../en-trading/twenty-three-en-artickle/twenty-three-en-artickle.module'
      ).then((m) => m.TwentyThreeEnArtickleModule),
  },
  {
    path: 'fibonaccilevels',
    loadChildren: () =>
      import(
        '../en-trading/twenty-four-en-artickle/twenty-four-en-artickle.module'
      ).then((m) => m.TwentyFourEnArtickleModule),
  },
  {
    path: 'keyeconomicgrowth',
    loadChildren: () =>
      import(
        '../en-trading/twenty-five-en-artickle/twenty-five-en-artickle.module'
      ).then((m) => m.TwentyFiveEnArtickleModule),
  },
  {
    path: 'technicalanalysis',
    loadChildren: () =>
      import(
        '../en-trading/twenty-six-en-artickle/twenty-six-en-artickle.module'
      ).then((m) => m.TwentySixEnArtickleModule),
  },
  {
    path: 'technicalmarketcharts',
    loadChildren: () =>
      import(
        '../en-trading/twenty-seven-en-artickle/twenty-seven-en-artickle.module'
      ).then((m) => m.TwentySevenEnArtickleModule),
  },
  {
    path: 'keypricepattern',
    loadChildren: () =>
      import(
        '../en-trading/twenty-eight-en-artickle/twenty-eight-en-artickle.module'
      ).then((m) => m.TwentyEightEnArtickleModule),
  },
  {
    path: 'smartmonettraps',
    loadChildren: () =>
      import(
        '../en-trading/twenty-nine-en-artickle/twenty-nine-en-artickle.module'
      ).then((m) => m.TwentyNineEnArtickleModule),
  },
  {
    path: 'imbalanceandfvg',
    loadChildren: () =>
      import('../en-trading/thirty-en-artickle/thirty-en-artickle.module').then(
        (m) => m.ThirtyEnArtickleModule
      ),
  },
  {
    path: 'marketorder',
    loadChildren: () =>
      import(
        '../en-trading/thirty-one-en-artickle/thirty-one-en-artickle.module'
      ).then((m) => m.ThirtyOneEnArtickleModule),
  },
  {
    path: 'stoporder',
    loadChildren: () =>
      import(
        '../en-trading/thirty-two-en-artickle/thirty-two-en-artickle.module'
      ).then((m) => m.ThirtyTwoEnArtickleModule),
  },
  {
    path: 'requotes',
    loadChildren: () =>
      import(
        '../en-trading/thirty-three-en-artickle/thirty-three-en-artickle.module'
      ).then((m) => m.ThirtyThreeEnArtickleModule),
  },
  {
    path: 'stoplimitorder',
    loadChildren: () =>
      import(
        '../en-trading/thirty-four-en-artickle/thirty-four-en-artickle.module'
      ).then((m) => m.ThirtyFourEnArtickleModule),
  },
  {
    path: 'tradingsystem',
    loadChildren: () =>
      import(
        '../en-trading/thirty-five-en-artickle/thirty-five-en-artickle.module'
      ).then((m) => m.ThirtyFiveEnArtickleModule),
  },
  {
    path: 'falsebreakouts',
    loadChildren: () =>
      import(
        '../en-trading/thirty-six-en-artickle/thirty-six-en-artickle.module'
      ).then((m) => m.ThirtySixEnArtickleModule),
  },
  {
    path: 'stophunting',
    loadChildren: () =>
      import(
        '../en-trading/thirty-seven-en-artickle/thirty-seven-en-artickle.module'
      ).then((m) => m.ThirtySevenEnArtickleModule),
  },
  {
    path: 'capitalmanagement',
    loadChildren: () =>
      import(
        '../en-trading/thirty-eight-en-artickle/thirty-eight-en-artickle.module'
      ).then((m) => m.ThirtyEightEnArtickleModule),
  },
  {
    path: 'profitandlossratio',
    loadChildren: () =>
      import(
        '../en-trading/thirty-nine-en-artickle/thirty-nine-en-artickle.module'
      ).then((m) => m.ThirtyNineEnArtickleModule),
  },
  {
    path: 'beginnermistakes',
    loadChildren: () =>
      import('../en-trading/fourty-en-artickle/fourty-en-artickle.module').then(
        (m) => m.FourtyEnArtickleModule
      ),
  },
  {
    path: 'tradingplan',
    loadChildren: () =>
      import(
        '../en-trading/fourty-one-en-artickle/fourty-one-en-artickle.module'
      ).then((m) => m.FourtyOneEnArtickleModule),
  },
  {
    path: 'timeframes',
    loadChildren: () =>
      import(
        '../en-trading/fourty-two-en-artickle/fourty-two-en-artickle.module'
      ).then((m) => m.FourtyTwoEnArtickleModule),
  },
  {
    path: 'liquiditypools',
    loadChildren: () =>
      import(
        '../en-trading/fourty-three-en-artickle/fourty-three-en-artickle.module'
      ).then((m) => m.FourtyThreeEnArtickleModule),
  },
  {
    path: 'icebergorders',
    loadChildren: () =>
      import(
        '../en-trading/fourty-four-en-artickle/fourty-four-en-artickle.module'
      ).then((m) => m.FourtyFourEnArtickleModule),
  },
  {
    path: 'freeeducation',
    loadChildren: () =>
      import(
        '../en-trading/fourty-five-en-artickle/fourty-five-en-artickle.module'
      ).then((m) => m.FourtyFiveEnArtickleModule),
  },
  {
    path: 'cryptotether',
    loadChildren: () =>
      import(
        '../en-trading/fourty-six-en-artickle/fourty-six-en-artickle.module'
      ).then((m) => m.FourtySixEnArtickleModule),
  },

  {
    path: 'smartmoneyconceptsguide', //61
    loadChildren: () =>
      import('../eu-blog/sixty-one-en-blog/sixty-one-en-blog.module').then(
        (m) => m.SixtyOneEnBlogModule
      ),
  },
  {
    path: 'smartmoneystrategies', //62
    loadChildren: () =>
      import('../eu-blog/sixty-two-en-blog/sixty-two-en-blog.module').then(
        (m) => m.SixtyTwoEnBlogModule
      ),
  },
  {
    path: 'smartmoneycontrol', //63
    loadChildren: () =>
      import('../eu-blog/sixty-three-en-blog/sixty-three-en-blog.module').then(
        (m) => m.SixtyThreeEnBlogModule
      ),
  },
  {
    path: 'practic', //64
    loadChildren: () =>
      import('../eu-blog/sixty-four-en-blog/sixty-four-en-blog.module').then(
        (m) => m.SixtyFourEnBlogModule
      ),
  },
  {
    path: 'stockorderbook', //65
    loadChildren: () =>
      import('../eu-blog/sixty-five-en-blog/sixty-five-en-blog.module').then(
        (m) => m.SixtyFiveEnBlogModule
      ),
  },
  {
    path: 'peakvolumelevels', //66
    loadChildren: () =>
      import('../eu-blog/sixty-six-en-blog/sixty-six-en-blog.module').then(
        (m) => m.SixtySixEnBlogModule
      ),
  },
  {
    path: 'trendvolumeanalysis', //67
    loadChildren: () =>
      import('../eu-blog/sixty-seven-en-blog/sixty-seven-en-blog.module').then(
        (m) => m.SixtySevenEnBlogModule
      ),
  },
  {
    path: 'marketauctiondevelops', //68
    loadChildren: () =>
      import('../eu-blog/sixty-eight-en-blog/sixty-eight-en-blog.module').then(
        (m) => m.SixtyEightEnBlogModule
      ),
  },
  {
    path: 'volumeandfuturesmarket', //69
    loadChildren: () =>
      import('../eu-blog/sixty-nine-en-blog/sixty-nine-en-blog.module').then(
        (m) => m.SixtyNineEnBlogModule
      ),
  },
  {
    path: 'wyckoffsvolumeconcept', //70
    loadChildren: () =>
      import('../eu-blog/seventy-en-blog/seventy-en-blog.module').then(
        (m) => m.SeventyEnBlogModule
      ),
  },
  {
    path: 'newstrading', //71
    loadChildren: () =>
      import('../eu-blog/seventy-one-en-blog/seventy-one-en-blog.module').then(
        (m) => m.SeventyOneEnBlogModule
      ),
  },
  {
    path: 'economiccalendar', //72
    loadChildren: () =>
      import('../eu-blog/seventy-two-en-blog/seventy-two-en-blog.module').then(
        (m) => m.SeventyTwoEnBlogModule
      ),
  },
  {
    path: 'macroeconomicindicators', //73
    loadChildren: () =>
      import(
        '../eu-blog/seventy-three-en-blog/seventy-three-en-blog.module'
      ).then((m) => m.SeventyThreeEnBlogModule),
  },
  {
    path: 'globalfundamentalanalysis', //74
    loadChildren: () =>
      import(
        '../eu-blog/seventy-four-en-blog/seventy-four-en-blog.module'
      ).then((m) => m.SeventyFourEnBlogModule),
  },
  {
    path: 'gamblingorbusiness', //75
    loadChildren: () =>
      import(
        '../eu-blog/seventy-five-en-blog/seventy-five-en-blog.module'
      ).then((m) => m.SeventyFiveEnBlogModule),
  },
  {
    path: 'williamgannpsychology', //76
    loadChildren: () =>
      import('../eu-blog/seventy-six-en-blog/seventy-six-en-blog.module').then(
        (m) => m.SeventySixEnBlogModule
      ),
  },
  {
    path: 'emotionsaffect', //77
    loadChildren: () =>
      import(
        '../eu-blog/seventy-seven-en-blog/seventy-seven-en-blog.module'
      ).then((m) => m.SeventySevenEnBlogModule),
  },
  {
    path: 'fomo', //78
    loadChildren: () =>
      import(
        '../eu-blog/seventy-eight-en-blog/seventy-eight-en-blog.module'
      ).then((m) => m.SeventyEightEnBlogModule),
  },
  {
    path: 'psychologyofaveraging', //79
    loadChildren: () =>
      import(
        '../eu-blog/seventy-nine-en-blog/seventy-nine-en-blog.module'
      ).then((m) => m.SeventyNineEnBlogModule),
  },
  {
    path: 'headandshoulders', //80
    loadChildren: () =>
      import('../eu-blog/eighty-en-blog/eighty-en-blog.module').then(
        (m) => m.EightyEnBlogModule
      ),
  },
  {
    path: 'trianglefigure', //81
    loadChildren: () =>
      import('../eu-blog/eighty-one-en-blog/eighty-one-en-blog.module').then(
        (m) => m.EightyOneEnBlogModule
      ),
  },
  {
    path: 'flagandpennant', //82
    loadChildren: () =>
      import('../eu-blog/eighty-two-en-blog/eighty-two-en-blog.module').then(
        (m) => m.EightyTwoEnBlogModule
      ),
  },
  {
    path: 'cupandhandle', //83
    loadChildren: () =>
      import(
        '../eu-blog/eighty-three-en-blog/eighty-three-en-blog.module'
      ).then((m) => m.EightyThreeEnBlogModule),
  },
  {
    path: 'engulfing', //84
    loadChildren: () =>
      import('../eu-blog/eighty-four-en-blog/eighty-four-en-blog.module').then(
        (m) => m.EightyFourEnBlogModule
      ),
  },
  {
    path: 'doubletopandbottom', //85
    loadChildren: () =>
      import('../eu-blog/eighty-five-en-blog/eighty-five-en-blog.module').then(
        (m) => m.EightyFiveEnBlogModule
      ),
  },
  {
    path: 'pattern-1-2-3', //86
    loadChildren: () =>
      import('../eu-blog/eighty-six-en-blog/eighty-six-en-blog.module').then(
        (m) => m.EightySixEnBlogModule
      ),
  },
  // {
  //   path: 'headandshoulders', //87
  //   loadChildren: () =>
  //     import(
  //       '../eu-blog/eighty-seven-en-blog/eighty-seven-en-blog.module'
  //     ).then((m) => m.EightySevenEnBlogModule),
  // },
];

@NgModule({
  declarations: [EnBlogHomepageComponent],
  imports: [CommonModule, MatPaginatorModule, RouterModule.forChild(routes)],
})
export class EuBlogModule {}

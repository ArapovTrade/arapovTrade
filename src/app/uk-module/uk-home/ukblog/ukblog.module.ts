import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkBlogHomepageComponent } from './uk-blog-homepage/uk-blog-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
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
    path: 'avoidlosingmoney', //4
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
    path: 'wyckoffmethod', //19
    loadChildren: () =>
      import('./nineteen-uk-blog/nineteen-uk-blog.module').then(
        (m) => m.NineteenUkBlogModule
      ),
  },
  {
    path: 'cryptoscam', //20
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
    path: 'cryptoarbitrage', //22
    loadChildren: () =>
      import('./twenty-two-uk-blog/twenty-two-uk-blog.module').then(
        (m) => m.TwentyTwoUkBlogModule
      ),
  },
  {
    path: 'bitcoinetf', //23
    loadChildren: () =>
      import('./twenty-three-uk-blog/twenty-three-uk-blog.module').then(
        (m) => m.TwentyThreeUkBlogModule
      ),
  },
  {
    path: 'flagfigure', //24
    loadChildren: () =>
      import('./twenty-four-uk-blog/twenty-four-uk-blog.module').then(
        (m) => m.TwentyFourUkBlogModule
      ),
  },
  {
    path: 'cryptommakers', //25
    loadChildren: () =>
      import('./twenty-five-uk-blog/twenty-five-uk-blog.module').then(
        (m) => m.TwentyFiveUkBlogModule
      ),
  },
  {
    path: 'ordertypes', //26
    loadChildren: () =>
      import('./twenty-six-uk-blog/twenty-six-uk-blog.module').then(
        (m) => m.TwentySixUkBlogModule
      ),
  },
  {
    path: 'japanesecandle', //27
    loadChildren: () =>
      import('./twenty-seven-uk-blog/twenty-seven-uk-blog.module').then(
        (m) => m.TwentySevenUkBlogModule
      ),
  },
  {
    path: 'altblockchains', //28
    loadChildren: () =>
      import('./twenty-eight-uk-blog/twenty-eight-uk-blog.module').then(
        (m) => m.TwentyEightUkBlogModule
      ),
  },
  {
    path: 'tradingquickstart', //29
    loadChildren: () =>
      import('./twenty-nine-uk-blog/twenty-nine-uk-blog.module').then(
        (m) => m.TwentyNineUkBlogModule
      ),
  },
  {
    path: 'cryptocurrencybasics', //30
    loadChildren: () =>
      import('./thirty-uk-blog/thirty-uk-blog.module').then(
        (m) => m.ThirtyUkBlogModule
      ),
  },
  {
    path: 'levelofsupport', //31
    loadChildren: () =>
      import('./thirty-one-uk-blog/thirty-one-uk-blog.module').then(
        (m) => m.ThirtyOneUkBlogModule
      ),
  },
  {
    path: 'purchasingcourses', //32
    loadChildren: () =>
      import('./thirty-two-uk-blog/thirty-two-uk-blog.module').then(
        (m) => m.ThirtyTwoUkBlogModule
      ),
  },
  {
    path: 'pinbar', //33
    loadChildren: () =>
      import('./thirty-three-uk-blog/thirty-three-uk-blog.module').then(
        (m) => m.ThirtyThreeUkBlogModule
      ),
  },
  {
    path: 'stoploss', //34
    loadChildren: () =>
      import('./thirty-four-uk-blog/thirty-four-uk-blog.module').then(
        (m) => m.ThirtyFourUkBlogModule
      ),
  },
  {
    path: 'tradingbasics', //35
    loadChildren: () =>
      import('./thirty-five-uk-blog/thirty-five-uk-blog.module').then(
        (m) => m.ThirtyFiveUkBlogModule
      ),
  },
  {
    path: 'cryptocurrencytrading', //36
    loadChildren: () =>
      import('./thirty-six-uk-blog/thirty-six-uk-blog.module').then(
        (m) => m.ThirtySixUkBlogModule
      ),
  },
  {
    path: 'drawdowns', //37
    loadChildren: () =>
      import('./thirty-seven-uk-blog/thirty-seven-uk-blog.module').then(
        (m) => m.ThirtySevenUkBlogModule
      ),
  },
  {
    path: 'cryptostoring', //38
    loadChildren: () =>
      import('./thirty-eight-uk-blog/thirty-eight-uk-blog.module').then(
        (m) => m.ThirtyEightUkBlogModule
      ),
  },
  {
    path: 'safetostorecrypto', //39
    loadChildren: () =>
      import('./thirty-nine-uk-blog/thirty-nine-uk-blog.module').then(
        (m) => m.ThirtyNineUkBlogModule
      ),
  },
  {
    path: 'difficulttrading', //40
    loadChildren: () =>
      import('./fourty-uk-blog/fourty-uk-blog.module').then(
        (m) => m.FourtyUkBlogModule
      ),
  },
  {
    path: 'successfultrading', //41
    loadChildren: () =>
      import('./fourty-one-uk-blog/fourty-one-uk-blog.module').then(
        (m) => m.FourtyOneUkBlogModule
      ),
  },
  {
    path: 'cryptocurrencyrisks', //42
    loadChildren: () =>
      import('./fourty-two-uk-blog/fourty-two-uk-blog.module').then(
        (m) => m.FourtyTwoUkBlogModule
      ),
  },
  {
    path: 'cryptomarketanalysis', //43
    loadChildren: () =>
      import('./fourty-three-uk-blog/fourty-three-uk-blog.module').then(
        (m) => m.FourtyThreeUkBlogModule
      ),
  },
  {
    path: 'cryptostaking', //44
    loadChildren: () =>
      import('./fourty-four-uk-blog/fourty-four-uk-blog.module').then(
        (m) => m.FourtyFourUkBlogModule
      ),
  },
  {
    path: 'movingaverages', //45
    loadChildren: () =>
      import('./fourty-five-uk-blog/fourty-five-uk-blog.module').then(
        (m) => m.FourtyFiveUkBlogModule
      ),
  },
  {
    path: 'pizzaday', //46
    loadChildren: () =>
      import('./fourty-six-uk-blog/fourty-six-uk-blog.module').then(
        (m) => m.FourtySixUkBlogModule
      ),
  },
  {
    path: 'fundamentalanalysis', //47
    loadChildren: () =>
      import('./fourty-seven-uk-blog/fourty-seven-uk-blog.module').then(
        (m) => m.FourtySevenUkBlogModule
      ),
  },
  {
    path: 'selfstudying', //48
    loadChildren: () =>
      import('./fourty-eight-uk-blog/fourty-eight-uk-blog.module').then(
        (m) => m.FourtyEightUkBlogModule
      ),
  },
  {
    path: 'choosingtradingplatform', //49
    loadChildren: () =>
      import('./fourty-nine-uk-blog/fourty-nine-uk-blog.module').then(
        (m) => m.FourtyNineUkBlogModule
      ),
  },
  {
    path: 'algorithmicorders', //50
    loadChildren: () =>
      import('./fifty-uk-blog/fifty-uk-blog.module').then(
        (m) => m.FiftyUkBlogModule
      ),
  },
  {
    path: 'candlestickpatterns', //51
    loadChildren: () =>
      import('./fifty-one-uk-blog/fifty-one-uk-blog.module').then(
        (m) => m.FiftyOneUkBlogModule
      ),
  },
  {
    path: 'anatomyofmarkettrends', //52
    loadChildren: () =>
      import('./fifty-two-uk-blog/fifty-two-uk-blog.module').then(
        (m) => m.FiftyTwoUkBlogModule
      ),
  },
  {
    path: 'orderblockintrading', //53
    loadChildren: () =>
      import('./fifty-three-uk-blog/fifty-three-uk-blog.module').then(
        (m) => m.FiftyThreeUkBlogModule
      ),
  },
  {
    path: 'cryptosafe', //54
    loadChildren: () =>
      import('./fifty-four-uk-blog/fifty-four-uk-blog.module').then(
        (m) => m.FiftyFourUkBlogModule
      ),
  },
  {
    path: 'scalpingintrading', //55
    loadChildren: () =>
      import('./fifty-five-uk-blog/fifty-five-uk-blog.module').then(
        (m) => m.FiftyFiveUkBlogModule
      ),
  },
  {
    path: 'benefitsoftradingbooks', //56
    loadChildren: () =>
      import('./fifty-six-uk-blog/fifty-six-uk-blog.module').then(
        (m) => m.FiftySixUkBlogModule
      ),
  },
  {
    path: 'tradingindicators', //57
    loadChildren: () =>
      import('./fifty-seven-uk-blog/fifty-seven-uk-blog.module').then(
        (m) => m.FiftySevenUkBlogModule
      ),
  },
  {
    path: 'averagingintrading', //58
    loadChildren: () =>
      import('./fifty-eight-uk-blog/fifty-eight-uk-blog.module').then(
        (m) => m.FiftyEightUkBlogModule
      ),
  },
  {
    path: 'levelbreakoutstrategy', //59
    loadChildren: () =>
      import('./fifty-nine-uk-blog/fifty-nine-uk-blog.module').then(
        (m) => m.FiftyNineUkBlogModule
      ),
  },
  {
    path: 'tradingvsoptions', //60
    loadChildren: () =>
      import('./sixty-uk-blog/sixty-uk-blog.module').then(
        (m) => m.SixtyUkBlogModule
      ),
  },
  {
    path: 'adviceforbeginners', //1
    loadChildren: () =>
      import('../uk-trading/one-article/one-article.module').then(
        (m) => m.OneArticleModule
      ),
  },

  {
    path: 'marketbasics', //2
    loadChildren: () =>
      import('../uk-trading/two-article/two-article.module').then(
        (m) => m.TwoArticleModule
      ),
  },
  {
    path: 'exchange', //3
    loadChildren: () =>
      import('../uk-trading/three-article/three-article.module').then(
        (m) => m.ThreeArticleModule
      ),
  },
  {
    path: 'exchangemarket', //4
    loadChildren: () =>
      import('../uk-trading/four-article/four-article.module').then(
        (m) => m.FourArticleModule
      ),
  },
  {
    path: 'derivatives', //5
    loadChildren: () =>
      import('../uk-trading/five-article/five-article.module').then(
        (m) => m.FiveArticleModule
      ),
  },
  {
    path: 'stablecoins', //6
    loadChildren: () =>
      import('../uk-trading/six-uk-artikle/six-uk-artikle.module').then(
        (m) => m.SixUkArtikleModule
      ),
  },
  {
    path: 'forexmarket', //7
    loadChildren: () =>
      import('../uk-trading/seven-uk-article/seven-uk-article.module').then(
        (m) => m.SevenUkArticleModule
      ),
  },
  {
    path: 'currenciesandquotes', //8
    loadChildren: () =>
      import('../uk-trading/eight-uk-article/eight-uk-article.module').then(
        (m) => m.EightUkArticleModule
      ),
  },
  {
    path: 'formationexchange', //9
    loadChildren: () =>
      import('../uk-trading/nine-uk-artickle/nine-uk-artickle.module').then(
        (m) => m.NineUkArtickleModule
      ),
  },
  {
    path: 'currencyposition', //10
    loadChildren: () =>
      import('../uk-trading/ten-uk-artickle/ten-uk-artickle.module').then(
        (m) => m.TenUkArtickleModule
      ),
  },
  {
    path: 'cryptostart', //11
    loadChildren: () =>
      import('../uk-trading/eleven-uk-artickle/eleven-uk-artickle.module').then(
        (m) => m.ElevenUkArtickleModule
      ),
  },
  {
    path: 'halving', //12
    loadChildren: () =>
      import('../uk-trading/twelve-uk-artickle/twelve-uk-artickle.module').then(
        (m) => m.TwelveUkArtickleModule
      ),
  },
  {
    path: 'riskcurrencyexchange', //13
    loadChildren: () =>
      import(
        '../uk-trading/thirteen-uk-artickle/thirteen-uk-artickle.module'
      ).then((m) => m.ThirteenUkArtickleModule),
  },
  {
    path: 'forexleveragerisk', //14
    loadChildren: () =>
      import(
        '../uk-trading/fourteen-uk-artickle/fourteen-uk-artickle.module'
      ).then((m) => m.FourteenUkArtickleModule),
  },
  {
    path: 'majorbankfrs', //15
    loadChildren: () =>
      import(
        '../uk-trading/fifteen-uk-artickle/fifteen-uk-artickle.module'
      ).then((m) => m.FifteenUkArtickleModule),
  },
  {
    path: 'ethereum', //16
    loadChildren: () =>
      import(
        '../uk-trading/sixteen-uk-artickle/sixteen-uk-artickle.module'
      ).then((m) => m.SixteenUkArtickleModule),
  },
  {
    path: 'bitcoin', //17
    loadChildren: () =>
      import(
        '../uk-trading/seventeen-uk-artickle/seventeen-uk-artickle.module'
      ).then((m) => m.SeventeenUkArtickleModule),
  },
  {
    path: 'psychorisks', //18
    loadChildren: () =>
      import(
        '../uk-trading/eighteen-uk-artickle/eighteen-uk-artickle.module'
      ).then((m) => m.EighteenUkArtickleModule),
  },
  {
    path: 'howtotradeonforex', //19
    loadChildren: () =>
      import(
        '../uk-trading/nineteen-uk-artickle/nineteen-uk-artickle.module'
      ).then((m) => m.NineteenUkArtickleModule),
  },
  {
    path: 'steidlmayeranalysis', //20
    loadChildren: () =>
      import('../uk-trading/twenty-uk-artickle/twenty-uk-artickle.module').then(
        (m) => m.TwentyUkArtickleModule
      ),
  },
  {
    path: 'marketanalysisforex', //21
    loadChildren: () =>
      import(
        '../uk-trading/twenty-one-uk-artickle/twenty-one-uk-artickle.module'
      ).then((m) => m.TwentyOneUkArtickleModule),
  },
  {
    path: 'econimicfactors', //22
    loadChildren: () =>
      import(
        '../uk-trading/twenty-two-uk-artickle/twenty-two-uk-artickle.module'
      ).then((m) => m.TwentyTwoUkArtickleModule),
  },
  {
    path: 'worldstockindicates', //23
    loadChildren: () =>
      import(
        '../uk-trading/twenty-three-uk-artickle/twenty-three-uk-artickle.module'
      ).then((m) => m.TwentyThreeUkArtickleModule),
  },
  {
    path: 'fibonaccilevels', //24
    loadChildren: () =>
      import(
        '../uk-trading/twenty-four-uk-artickle/twenty-four-uk-artickle.module'
      ).then((m) => m.TwentyFourUkArtickleModule),
  },
  {
    path: 'keyeconomicgrowth', //25
    loadChildren: () =>
      import(
        '../uk-trading/twenty-five-uk-artickle/twenty-five-uk-artickle.module'
      ).then((m) => m.TwentyFiveUkArtickleModule),
  },
  {
    path: 'technicalanalysis', //26
    loadChildren: () =>
      import(
        '../uk-trading/twenty-six-uk-artickle/twenty-six-uk-artickle.module'
      ).then((m) => m.TwentySixUkArtickleModule),
  },
  {
    path: 'technicalmarketcharts', //27
    loadChildren: () =>
      import(
        '../uk-trading/twenty-seven-uk-artickle/twenty-seven-uk-artickle.module'
      ).then((m) => m.TwentySevenUkArtickleModule),
  },
  {
    path: 'keypricepattern', //28
    loadChildren: () =>
      import(
        '../uk-trading/twenty-eight-uk-artickle/twenty-eight-uk-artickle.module'
      ).then((m) => m.TwentyEightUkArtickleModule),
  },
  {
    path: 'smartmonettraps', //29
    loadChildren: () =>
      import(
        '../uk-trading/twenty-nine-uk-artickle/twenty-nine-uk-artickle.module'
      ).then((m) => m.TwentyNineUkArtickleModule),
  },
  {
    path: 'imbalanceandfvg', //30
    loadChildren: () =>
      import('../uk-trading/thirty-uk-artickle/thirty-uk-artickle.module').then(
        (m) => m.ThirtyUkArtickleModule
      ),
  },
  {
    path: 'marketorder', //31
    loadChildren: () =>
      import(
        '../uk-trading/thirty-one-uk-artickle/thirty-one-uk-artickle.module'
      ).then((m) => m.ThirtyOneUkArtickleModule),
  },
  {
    path: 'stoporder', //32
    loadChildren: () =>
      import(
        '../uk-trading/thirty-two-uk-artickle/thirty-two-uk-artickle.module'
      ).then((m) => m.ThirtyTwoUkArtickleModule),
  },
  {
    path: 'requotes', //33
    loadChildren: () =>
      import(
        '../uk-trading/thirty-three-uk-artickle/thirty-three-uk-artickle.module'
      ).then((m) => m.ThirtyThreeUkArtickleModule),
  },
  {
    path: 'stoplimitorder', //34
    loadChildren: () =>
      import(
        '../uk-trading/thirty-four-uk-artickle/thirty-four-uk-artickle.module'
      ).then((m) => m.ThirtyFourUkArtickleModule),
  },
  {
    path: 'tradingsystem', //35
    loadChildren: () =>
      import(
        '../uk-trading/thirty-five-uk-artickle/thirty-five-uk-artickle.module'
      ).then((m) => m.ThirtyFiveUkArtickleModule),
  },
  {
    path: 'falsebreakouts', //36
    loadChildren: () =>
      import(
        '../uk-trading/thirty-six-uk-artickle/thirty-six-uk-artickle.module'
      ).then((m) => m.ThirtySixUkArtickleModule),
  },
  {
    path: 'stophunting', //37
    loadChildren: () =>
      import(
        '../uk-trading/thirty-seven-uk-artickle/thirty-seven-uk-artickle.module'
      ).then((m) => m.ThirtySevenUkArtickleModule),
  },
  {
    path: 'capitalmanagement', //38
    loadChildren: () =>
      import(
        '../uk-trading/thirty-eight-uk-artickle/thirty-eight-uk-artickle.module'
      ).then((m) => m.ThirtyEightUkArtickleModule),
  },
  {
    path: 'profitandlossratio', //39
    loadChildren: () =>
      import(
        '../uk-trading/thirty-nine-uk-artickle/thirty-nine-uk-artickle.module'
      ).then((m) => m.ThirtyNineUkArtickleModule),
  },
  {
    path: 'beginnermistakes', //40
    loadChildren: () =>
      import('../uk-trading/fourty-uk-artickle/fourty-uk-artickle.module').then(
        (m) => m.FourtyUkArtickleModule
      ),
  },
  {
    path: 'tradingplan', //41
    loadChildren: () =>
      import(
        '../uk-trading/fourty-one-uk-artickle/fourty-one-uk-artickle.module'
      ).then((m) => m.FourtyOneUkArtickleModule),
  },
  {
    path: 'timeframes', //42
    loadChildren: () =>
      import(
        '../uk-trading/fourty-two-uk-artickle/fourty-two-uk-artickle.module'
      ).then((m) => m.FourtyTwoUkArtickleModule),
  },
  {
    path: 'liquiditypools', //43
    loadChildren: () =>
      import(
        '../uk-trading/fourty-three-uk-artickle/fourty-three-uk-artickle.module'
      ).then((m) => m.FourtyThreeUkArtickleModule),
  },
  {
    path: 'icebergorders', //44
    loadChildren: () =>
      import(
        '../uk-trading/fourty-four-uk-artickle/fourty-four-uk-artickle.module'
      ).then((m) => m.FourtyFourUkArtickleModule),
  },
  {
    path: 'freeeducation', //45
    loadChildren: () =>
      import(
        '../uk-trading/fourty-five-uk-artickle/fourty-five-uk-artickle.module'
      ).then((m) => m.FourtyFiveUkArtickleModule),
  },
  {
    path: 'cryptotether', //46
    loadChildren: () =>
      import(
        '../uk-trading/fourty-six-uk-artickle/fourty-six-uk-artickle.module'
      ).then((m) => m.FourtySixUkArtickleModule),
  },
  {
    path: 'smartmoneyconceptsguide', //61
    loadChildren: () =>
      import('../ukblog/sixty-one-uk-blog/sixty-one-uk-blog.module').then(
        (m) => m.SixtyOneUkBlogModule
      ),
  },
  {
    path: 'smartmoneystrategies', //62
    loadChildren: () =>
      import('../ukblog/sixty-two-uk-blog/sixty-two-uk-blog.module').then(
        (m) => m.SixtyTwoUkBlogModule
      ),
  },
  {
    path: 'smartmoneycontrol', //63
    loadChildren: () =>
      import('../ukblog/sixty-three-uk-blog/sixty-three-uk-blog.module').then(
        (m) => m.SixtyThreeUkBlogModule
      ),
  },
  {
    path: 'practic', //64
    loadChildren: () =>
      import('../ukblog/sixty-four-uk-blog/sixty-four-uk-blog.module').then(
        (m) => m.SixtyFourUkBlogModule
      ),
  },
  {
    path: 'stockorderbook', //65
    loadChildren: () =>
      import('../ukblog/sixty-five-uk-blog/sixty-five-uk-blog.module').then(
        (m) => m.SixtyFiveUkBlogModule
      ),
  },
  {
    path: 'peakvolumelevels', //66
    loadChildren: () =>
      import('../ukblog/sixty-six-uk-blog/sixty-six-uk-blog.module').then(
        (m) => m.SixtySixUkBlogModule
      ),
  },
  {
    path: 'trendvolumeanalysis', //67
    loadChildren: () =>
      import('../ukblog/sixty-seven-uk-blog/sixty-seven-uk-blog.module').then(
        (m) => m.SixtySevenUkBlogModule
      ),
  },
  {
    path: 'marketauctiondevelops', //68
    loadChildren: () =>
      import('../ukblog/sixty-eight-uk-blog/sixty-eight-uk-blog.module').then(
        (m) => m.SixtyEightUkBlogModule
      ),
  },
  {
    path: 'volumeandfuturesmarket', //69
    loadChildren: () =>
      import('../ukblog/sixty-nine-uk-blog/sixty-nine-uk-blog.module').then(
        (m) => m.SixtyNineUkBlogModule
      ),
  },
  {
    path: 'wyckoffsvolumeconcept', //70
    loadChildren: () =>
      import('../ukblog/seventy-uk-blog/seventy-uk-blog.module').then(
        (m) => m.SeventyUkBlogModule
      ),
  },
  {
    path: 'newstrading', //71
    loadChildren: () =>
      import('../ukblog/seventy-one-uk-blog/seventy-one-uk-blog.module').then(
        (m) => m.SeventyOneUkBlogModule
      ),
  },
  {
    path: 'economiccalendar', //72
    loadChildren: () =>
      import('../ukblog/seventy-two-uk-blog/seventy-two-uk-blog.module').then(
        (m) => m.SeventyTwoUkBlogModule
      ),
  },
  {
    path: 'macroeconomicindicators', //73
    loadChildren: () =>
      import(
        '../ukblog/seventy-three-uk-blog/seventy-three-uk-blog.module'
      ).then((m) => m.SeventyThreeUkBlogModule),
  },
  {
    path: 'globalfundamentalanalysis', //74
    loadChildren: () =>
      import('../ukblog/seventy-four-uk-blog/seventy-four-uk-blog.module').then(
        (m) => m.SeventyFourUkBlogModule
      ),
  },
  {
    path: 'gamblingorbusiness', //75
    loadChildren: () =>
      import('../ukblog/seventy-five-uk-blog/seventy-five-uk-blog.module').then(
        (m) => m.SeventyFiveUkBlogModule
      ),
  },
  {
    path: 'williamgannpsychology', //76
    loadChildren: () =>
      import('../ukblog/seventy-six-uk-blog/seventy-six-uk-blog.module').then(
        (m) => m.SeventySixUkBlogModule
      ),
  },
  {
    path: 'emotionsaffect', //77
    loadChildren: () =>
      import(
        '../ukblog/seventy-seven-uk-blog/seventy-seven-uk-blog.module'
      ).then((m) => m.SeventySevenUkBlogModule),
  },
  {
    path: 'fomo', //78
    loadChildren: () =>
      import(
        '../ukblog/seventy-eight-uk-blog/seventy-eight-uk-blog.module'
      ).then((m) => m.SeventyEightUkBlogModule),
  },
  {
    path: 'psychologyofaveraging', //79
    loadChildren: () =>
      import('../ukblog/seventy-nine-uk-blog/seventy-nine-uk-blog.module').then(
        (m) => m.SeventyNineUkBlogModule
      ),
  },
  {
    path: 'headandshoulders', //80
    loadChildren: () =>
      import('../ukblog/eighty-uk-blog/eighty-uk-blog.module').then(
        (m) => m.EightyUkBlogModule
      ),
  },
  {
    path: 'trianglefigure', //81
    loadChildren: () =>
      import('../ukblog/eighty-one-uk-blog/eighty-one-uk-blog.module').then(
        (m) => m.EightyOneUkBlogModule
      ),
  },
  {
    path: 'flagandpennant', //82
    loadChildren: () =>
      import('../ukblog/eighty-two-uk-blog/eighty-two-uk-blog.module').then(
        (m) => m.EightyTwoUkBlogModule
      ),
  },
  {
    path: 'cupandhandle', //83
    loadChildren: () =>
      import('../ukblog/eighty-three-uk-blog/eighty-three-uk-blog.module').then(
        (m) => m.EightyThreeUkBlogModule
      ),
  },
  {
    path: 'engulfing', //84
    loadChildren: () =>
      import('../ukblog/eighty-four-uk-blog/eighty-four-uk-blog.module').then(
        (m) => m.EightyFourUkBlogModule
      ),
  },
  {
    path: 'doubletopandbottom', //85
    loadChildren: () =>
      import('../ukblog/eighty-five-uk-blog/eighty-five-uk-blog.module').then(
        (m) => m.EightyFiveUkBlogModule
      ),
  },
  {
    path: 'pattern-1-2-3', //86
    loadChildren: () =>
      import('../ukblog/eighty-six-uk-blog/eighty-six-uk-blog.module').then(
        (m) => m.EightySixUkBlogModule
      ),
  },
  // {
  //   path: 'headandshoulders', //87
  //   loadChildren: () =>
  //     import('../ukblog/eighty-seven-uk-blog/eighty-seven-uk-blog.module').then(
  //       (m) => m.EightySevenUkBlogModule
  //     ),
  // },
];

@NgModule({
  declarations: [UkBlogHomepageComponent],
  imports: [CommonModule,MatExpansionModule, MatPaginatorModule, RouterModule.forChild(routes)],
})
export class UkblogModule {}

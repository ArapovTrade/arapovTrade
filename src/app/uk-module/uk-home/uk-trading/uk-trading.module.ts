import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkTradingHomepageComponent } from './uk-trading-homepage/uk-trading-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UkTradingHomepageComponent },

  {
    path: 'adviceforbeginners', //1
    loadChildren: () =>
      import('./one-article/one-article.module').then(
        (m) => m.OneArticleModule
      ),
  },

  {
    path: 'marketbasics', //2
    loadChildren: () =>
      import('./two-article/two-article.module').then(
        (m) => m.TwoArticleModule
      ),
  },
  {
    path: 'exchange', //3
    loadChildren: () =>
      import('./three-article/three-article.module').then(
        (m) => m.ThreeArticleModule
      ),
  },
  {
    path: 'exchangemarket', //4
    loadChildren: () =>
      import('./four-article/four-article.module').then(
        (m) => m.FourArticleModule
      ),
  },
  {
    path: 'derivatives', //5
    loadChildren: () =>
      import('./five-article/five-article.module').then(
        (m) => m.FiveArticleModule
      ),
  },
  {
    path: 'exchangeparticipants', //6
    loadChildren: () =>
      import('./six-uk-artikle/six-uk-artikle.module').then(
        (m) => m.SixUkArtikleModule
      ),
  },
  {
    path: 'forexmarket', //7
    loadChildren: () =>
      import('./seven-uk-article/seven-uk-article.module').then(
        (m) => m.SevenUkArticleModule
      ),
  },
  {
    path: 'currenciesandquotes', //8
    loadChildren: () =>
      import('./eight-uk-article/eight-uk-article.module').then(
        (m) => m.EightUkArticleModule
      ),
  },
  {
    path: 'formationexchange', //9
    loadChildren: () =>
      import('./nine-uk-artickle/nine-uk-artickle.module').then(
        (m) => m.NineUkArtickleModule
      ),
  },
  {
    path: 'currencyposition', //10
    loadChildren: () =>
      import('./ten-uk-artickle/ten-uk-artickle.module').then(
        (m) => m.TenUkArtickleModule
      ),
  },
  {
    path: 'forexvaluedate', //11
    loadChildren: () =>
      import('./eleven-uk-artickle/eleven-uk-artickle.module').then(
        (m) => m.ElevenUkArtickleModule
      ),
  },
  {
    path: 'howtomakemoney', //12
    loadChildren: () =>
      import('./twelve-uk-artickle/twelve-uk-artickle.module').then(
        (m) => m.TwelveUkArtickleModule
      ),
  },
  {
    path: 'riskcurrencyexchange', //13
    loadChildren: () =>
      import('./thirteen-uk-artickle/thirteen-uk-artickle.module').then(
        (m) => m.ThirteenUkArtickleModule
      ),
  },
  {
    path: 'forexleveragerisk', //14
    loadChildren: () =>
      import('./fourteen-uk-artickle/fourteen-uk-artickle.module').then(
        (m) => m.FourteenUkArtickleModule
      ),
  },
  {
    path: 'majorbankfrs', //15
    loadChildren: () =>
      import('./fifteen-uk-artickle/fifteen-uk-artickle.module').then(
        (m) => m.FifteenUkArtickleModule
      ),
  },
  {
    path: 'behavioralrisks', //16
    loadChildren: () =>
      import('./sixteen-uk-artickle/sixteen-uk-artickle.module').then(
        (m) => m.SixteenUkArtickleModule
      ),
  },
  {
    path: 'nonmarketrisks', //17
    loadChildren: () =>
      import('./seventeen-uk-artickle/seventeen-uk-artickle.module').then(
        (m) => m.SeventeenUkArtickleModule
      ),
  },
  {
    path: 'psychorisks', //18
    loadChildren: () =>
      import('./eighteen-uk-artickle/eighteen-uk-artickle.module').then(
        (m) => m.EighteenUkArtickleModule
      ),
  },
  {
    path: 'howtotradeonforex', //19
    loadChildren: () =>
      import('./nineteen-uk-artickle/nineteen-uk-artickle.module').then(
        (m) => m.NineteenUkArtickleModule
      ),
  },
  {
    path: 'marketanalysis', //20
    loadChildren: () =>
      import('./twenty-uk-artickle/twenty-uk-artickle.module').then(
        (m) => m.TwentyUkArtickleModule
      ),
  },
  {
    path: 'marketanalysisforex', //21
    loadChildren: () =>
      import('./twenty-one-uk-artickle/twenty-one-uk-artickle.module').then(
        (m) => m.TwentyOneUkArtickleModule
      ),
  },
  {
    path: 'econimicfactors', //22
    loadChildren: () =>
      import('./twenty-two-uk-artickle/twenty-two-uk-artickle.module').then(
        (m) => m.TwentyTwoUkArtickleModule
      ),
  },
  {
    path: 'worldstockindicates', //23
    loadChildren: () =>
      import('./twenty-three-uk-artickle/twenty-three-uk-artickle.module').then(
        (m) => m.TwentyThreeUkArtickleModule
      ),
  },
  {
    path: 'economicstate', //24
    loadChildren: () =>
      import('./twenty-four-uk-artickle/twenty-four-uk-artickle.module').then(
        (m) => m.TwentyFourUkArtickleModule
      ),
  },
  {
    path: 'keyeconomicgrowth', //25
    loadChildren: () =>
      import('./twenty-five-uk-artickle/twenty-five-uk-artickle.module').then(
        (m) => m.TwentyFiveUkArtickleModule
      ),
  },
  {
    path: 'technicalanalysis', //26
    loadChildren: () =>
      import('./twenty-six-uk-artickle/twenty-six-uk-artickle.module').then(
        (m) => m.TwentySixUkArtickleModule
      ),
  },
  {
    path: 'technicalmarketcharts', //27
    loadChildren: () =>
      import('./twenty-seven-uk-artickle/twenty-seven-uk-artickle.module').then(
        (m) => m.TwentySevenUkArtickleModule
      ),
  },
  {
    path: 'keypricepattern', //28
    loadChildren: () =>
      import('./twenty-eight-uk-artickle/twenty-eight-uk-artickle.module').then(
        (m) => m.TwentyEightUkArtickleModule
      ),
  },
  {
    path: 'volumemarketanalysis', //29
    loadChildren: () =>
      import('./twenty-nine-uk-artickle/twenty-nine-uk-artickle.module').then(
        (m) => m.TwentyNineUkArtickleModule
      ),
  },
  {
    path: 'typesoforders', //30
    loadChildren: () =>
      import('./thirty-uk-artickle/thirty-uk-artickle.module').then(
        (m) => m.ThirtyUkArtickleModule
      ),
  },
  {
    path: 'marketorder', //31
    loadChildren: () =>
      import('./thirty-one-uk-artickle/thirty-one-uk-artickle.module').then(
        (m) => m.ThirtyOneUkArtickleModule
      ),
  },
  {
    path: 'stoporder', //32
    loadChildren: () =>
      import('./thirty-two-uk-artickle/thirty-two-uk-artickle.module').then(
        (m) => m.ThirtyTwoUkArtickleModule
      ),
  },
  {
    path: 'requotes', //33
    loadChildren: () =>
      import('./thirty-three-uk-artickle/thirty-three-uk-artickle.module').then(
        (m) => m.ThirtyThreeUkArtickleModule
      ),
  },
  {
    path: 'stoplimitorder', //34
    loadChildren: () =>
      import('./thirty-four-uk-artickle/thirty-four-uk-artickle.module').then(
        (m) => m.ThirtyFourUkArtickleModule
      ),
  },
  {
    path: 'tradingsystem', //35
    loadChildren: () =>
      import('./thirty-five-uk-artickle/thirty-five-uk-artickle.module').then(
        (m) => m.ThirtyFiveUkArtickleModule
      ),
  },
  {
    path: 'tradingsystemsseparation', //36
    loadChildren: () =>
      import('./thirty-six-uk-artickle/thirty-six-uk-artickle.module').then(
        (m) => m.ThirtySixUkArtickleModule
      ),
  },
  {
    path: 'tradingsystemautomation', //37
    loadChildren: () =>
      import('./thirty-seven-uk-artickle/thirty-seven-uk-artickle.module').then(
        (m) => m.ThirtySevenUkArtickleModule
      ),
  },
  {
    path: 'capitalmanagement', //38
    loadChildren: () =>
      import('./thirty-eight-uk-artickle/thirty-eight-uk-artickle.module').then(
        (m) => m.ThirtyEightUkArtickleModule
      ),
  },
  {
    path: 'profitandlossratio', //39
    loadChildren: () =>
      import('./thirty-nine-uk-artickle/thirty-nine-uk-artickle.module').then(
        (m) => m.ThirtyNineUkArtickleModule
      ),
  },
  {
    path: 'beginnermistakes', //40
    loadChildren: () =>
      import('./fourty-uk-artickle/fourty-uk-artickle.module').then(
        (m) => m.FourtyUkArtickleModule
      ),
  },
  {
    path: 'tradingplan', //41
    loadChildren: () =>
      import('./fourty-one-uk-artickle/fourty-one-uk-artickle.module').then(
        (m) => m.FourtyOneUkArtickleModule
      ),
  },
  {
    path: 'timeframes', //42
    loadChildren: () =>
      import('./fourty-two-uk-artickle/fourty-two-uk-artickle.module').then(
        (m) => m.FourtyTwoUkArtickleModule
      ),
  },
  {
    path: 'selectingtimeframe', //43
    loadChildren: () =>
      import('./fourty-three-uk-artickle/fourty-three-uk-artickle.module').then(
        (m) => m.FourtyThreeUkArtickleModule
      ),
  },
  {
    path: 'timeframeforbeginner', //44
    loadChildren: () =>
      import('./fourty-four-uk-artickle/fourty-four-uk-artickle.module').then(
        (m) => m.FourtyFourUkArtickleModule
      ),
  },
  {
    path: 'typeoftimeframes', //45
    loadChildren: () =>
      import('./fourty-five-uk-artickle/fourty-five-uk-artickle.module').then(
        (m) => m.FourtyFiveUkArtickleModule
      ),
  },
  {
    path: 'reasonforloosingmoney', //46
    loadChildren: () =>
      import('./fourty-six-uk-artickle/fourty-six-uk-artickle.module').then(
        (m) => m.FourtySixUkArtickleModule
      ),
  },
];

@NgModule({
  declarations: [UkTradingHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UkTradingModule {}

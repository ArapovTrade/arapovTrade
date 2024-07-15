import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuTradingHomepageComponent } from './ru-trading-homepage/ru-trading-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RuTradingHomepageComponent },
  // { path: 'adviceForBeginners', component: RuTradingArticleOneComponent },

  {
    path: 'adviceforbeginners',
    loadChildren: () =>
      import('./one-ru-article/one-ru-article.module').then(
        (m) => m.OneRUArticleModule
      ),
  },

  {
    path: 'marketbasics',
    loadChildren: () =>
      import('./two-ru-article/two-ru-article.module').then(
        (m) => m.TwoRuArticleModule
      ),
  },
  {
    path: 'exchange',
    loadChildren: () =>
      import('./three-ru-article/three-ru-article.module').then(
        (m) => m.ThreeRuArticleModule
      ),
  },
  {
    path: 'exchangemarket',
    loadChildren: () =>
      import('./four-ru-article/four-ru-article.module').then(
        (m) => m.FourRuArticleModule
      ),
  },
  {
    path: 'derivatives',
    loadChildren: () =>
      import('./five-ru-article/five-ru-article.module').then(
        (m) => m.FiveRuArticleModule
      ),
  },
  {
    path: 'exchangeparticipants',
    loadChildren: () =>
      import('./six-ru-article/six-ru-article.module').then(
        (m) => m.SixRuArticleModule
      ),
  },
  {
    path: 'forexmarket',
    loadChildren: () =>
      import('./seven-ru-article/seven-ru-article.module').then(
        (m) => m.SevenRuArticleModule
      ),
  },
  {
    path: 'currenciesandquotes',
    loadChildren: () =>
      import('./eight-ru-article/eight-ru-article.module').then(
        (m) => m.EightRuArticleModule
      ),
  },
  {
    path: 'formationexchange',
    loadChildren: () =>
      import('./nine-ru-article/nine-ru-article.module').then(
        (m) => m.NineRuArticleModule
      ),
  },

  {
    path: 'currencyposition',
    loadChildren: () =>
      import('./ten-ru-artickle/ten-ru-artickle.module').then(
        (m) => m.TenRuArtickleModule
      ),
  },
  {
    path: 'forexvaluedate',
    loadChildren: () =>
      import('./eleven-ru-artickle/eleven-ru-artickle.module').then(
        (m) => m.ElevenRuArtickleModule
      ),
  },
  {
    path: 'howtomakemoney',
    loadChildren: () =>
      import('./twelve-ru-artickle/twelve-ru-artickle.module').then(
        (m) => m.TwelveRuArtickleModule
      ),
  },
  {
    path: 'riskcurrencyexchange',
    loadChildren: () =>
      import('./thirteen-ru-artickle/thirteen-ru-artickle.module').then(
        (m) => m.ThirteenRuArtickleModule
      ),
  },
  {
    path: 'forexleveragerisk',
    loadChildren: () =>
      import('./fourteen-ru-artickle/fourteen-ru-artickle.module').then(
        (m) => m.FourteenRuArtickleModule
      ),
  },
  {
    path: 'majorbankfrs',
    loadChildren: () =>
      import('./fifteen-ru-artickle/fifteen-ru-artickle.module').then(
        (m) => m.FifteenRuArtickleModule
      ),
  },
  {
    path: 'behavioralrisks',
    loadChildren: () =>
      import('./sixteen-ru-artickle/sixteen-ru-artickle.module').then(
        (m) => m.SixteenRuArtickleModule
      ),
  },
  {
    path: 'nonmarketrisks',
    loadChildren: () =>
      import('./seventeen-ru-artickle/seventeen-ru-artickle.module').then(
        (m) => m.SeventeenRuArtickleModule
      ),
  },
  {
    path: 'psychorisks',
    loadChildren: () =>
      import('./eighteen-ru-artickle/eighteen-ru-artickle.module').then(
        (m) => m.EighteenRuArtickleModule
      ),
  },
  {
    path: 'howtotradeonforex',
    loadChildren: () =>
      import('./nineteen-ru-artickle/nineteen-ru-artickle.module').then(
        (m) => m.NineteenRuArtickleModule
      ),
  },
  {
    path: 'marketanalysis',
    loadChildren: () =>
      import('./twenty-ru-artickle/twenty-ru-artickle.module').then(
        (m) => m.TwentyRuArtickleModule
      ),
  },
  {
    path: 'marketanalysisforex',
    loadChildren: () =>
      import('./twenty-one-ru-artickle/twenty-one-ru-artickle.module').then(
        (m) => m.TwentyOneRuArtickleModule
      ),
  },
  {
    path: 'econimicfactors',
    loadChildren: () =>
      import('./twenty-two-ru-artickle/twenty-two-ru-artickle.module').then(
        (m) => m.TwentyTwoRuArtickleModule
      ),
  },
  {
    path: 'worldstockindicates',
    loadChildren: () =>
      import('./twenty-three-ru-artickle/twenty-three-ru-artickle.module').then(
        (m) => m.TwentyThreeRuArtickleModule
      ),
  },
  {
    path: 'economicstate',
    loadChildren: () =>
      import('./twenty-four-ru-artickle/twenty-four-ru-artickle.module').then(
        (m) => m.TwentyFourRuArtickleModule
      ),
  },
  {
    path: 'keyeconomicgrowth',
    loadChildren: () =>
      import('./twenty-five-ru-artickle/twenty-five-ru-artickle.module').then(
        (m) => m.TwentyFiveRuArtickleModule
      ),
  },
  {
    path: 'technicalanalysis',
    loadChildren: () =>
      import('./twenty-six-ru-artickle/twenty-six-ru-artickle.module').then(
        (m) => m.TwentySixRuArtickleModule
      ),
  },
  {
    path: 'technicalmarketcharts',
    loadChildren: () =>
      import('./twenty-seven-ru-artickle/twenty-seven-ru-artickle.module').then(
        (m) => m.TwentySevenRuArtickleModule
      ),
  },
  {
    path: 'keypricepattern',
    loadChildren: () =>
      import('./twenty-eight-ru-artickle/twenty-eight-ru-artickle.module').then(
        (m) => m.TwentyEightRuArtickleModule
      ),
  },
  {
    path: 'volumemarketanalysis',
    loadChildren: () =>
      import('./twenty-nine-ru-artickle/twenty-nine-ru-artickle.module').then(
        (m) => m.TwentyNineRuArtickleModule
      ),
  },
  {
    path: 'typesoforders',
    loadChildren: () =>
      import('./thirty-ru-artickle/thirty-ru-artickle.module').then(
        (m) => m.ThirtyRuArtickleModule
      ),
  },
  {
    path: 'marketorder',
    loadChildren: () =>
      import('./thirty-one-ru-artickle/thirty-one-ru-artickle.module').then(
        (m) => m.ThirtyOneRuArtickleModule
      ),
  },
  {
    path: 'stoporder',
    loadChildren: () =>
      import('./thirty-two-ru-artickle/thirty-two-ru-artickle.module').then(
        (m) => m.ThirtyTwoRuArtickleModule
      ),
  },
  {
    path: '33',
    loadChildren: () =>
      import('./thirty-three-ru-artickle/thirty-three-ru-artickle.module').then(
        (m) => m.ThirtyThreeRuArtickleModule
      ),
  },
  {
    path: '34',
    loadChildren: () =>
      import('./thirty-four-ru-artickle/thirty-four-ru-artickle.module').then(
        (m) => m.ThirtyFourRuArtickleModule
      ),
  },
  {
    path: '35',
    loadChildren: () =>
      import('./thirty-five-ru-artickle/thirty-five-ru-artickle.module').then(
        (m) => m.ThirtyFiveRuArtickleModule
      ),
  },
  {
    path: '36',
    loadChildren: () =>
      import('./thirty-six-ru-artickle/thirty-six-ru-artickle.module').then(
        (m) => m.ThirtySixRuArtickleModule
      ),
  },
  {
    path: '37',
    loadChildren: () =>
      import('./thirty-seven-ru-artickle/thirty-seven-ru-artickle.module').then(
        (m) => m.ThirtySevenRuArtickleModule
      ),
  },
  {
    path: '38',
    loadChildren: () =>
      import('./thirty-eight-ru-artickle/thirty-eight-ru-artickle.module').then(
        (m) => m.ThirtyEightRuArtickleModule
      ),
  },
  {
    path: '39',
    loadChildren: () =>
      import('./thirty-nine-ru-artickle/thirty-nine-ru-artickle.module').then(
        (m) => m.ThirtyNineRuArtickleModule
      ),
  },
  {
    path: '40',
    loadChildren: () =>
      import('./fourty-ru-artickle/fourty-ru-artickle.module').then(
        (m) => m.FourtyRuArtickleModule
      ),
  },
];

@NgModule({
  declarations: [RuTradingHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RuTradingModule {}

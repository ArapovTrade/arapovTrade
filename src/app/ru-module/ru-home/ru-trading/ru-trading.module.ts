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
    path: '21',
    loadChildren: () =>
      import('./twenty-one-ru-artickle/twenty-one-ru-artickle.module').then(
        (m) => m.TwentyOneRuArtickleModule
      ),
  },
  {
    path: '22',
    loadChildren: () =>
      import('./twenty-two-ru-artickle/twenty-two-ru-artickle.module').then(
        (m) => m.TwentyTwoRuArtickleModule
      ),
  },
  {
    path: '23',
    loadChildren: () =>
      import('./twenty-three-ru-artickle/twenty-three-ru-artickle.module').then(
        (m) => m.TwentyThreeRuArtickleModule
      ),
  },
  {
    path: '24',
    loadChildren: () =>
      import('./twenty-four-ru-artickle/twenty-four-ru-artickle.module').then(
        (m) => m.TwentyFourRuArtickleModule
      ),
  },
  {
    path: '25',
    loadChildren: () =>
      import('./twenty-five-ru-artickle/twenty-five-ru-artickle.module').then(
        (m) => m.TwentyFiveRuArtickleModule
      ),
  },
  {
    path: '26',
    loadChildren: () =>
      import('./twenty-six-ru-artickle/twenty-six-ru-artickle.module').then(
        (m) => m.TwentySixRuArtickleModule
      ),
  },
  {
    path: '27',
    loadChildren: () =>
      import('./twenty-seven-ru-artickle/twenty-seven-ru-artickle.module').then(
        (m) => m.TwentySevenRuArtickleModule
      ),
  },
  {
    path: '28',
    loadChildren: () =>
      import('./twenty-eight-ru-artickle/twenty-eight-ru-artickle.module').then(
        (m) => m.TwentyEightRuArtickleModule
      ),
  },
  {
    path: '29',
    loadChildren: () =>
      import('./twenty-nine-ru-artickle/twenty-nine-ru-artickle.module').then(
        (m) => m.TwentyNineRuArtickleModule
      ),
  },
  {
    path: '30',
    loadChildren: () =>
      import('./thirty-ru-artickle/thirty-ru-artickle.module').then(
        (m) => m.ThirtyRuArtickleModule
      ),
  },
];

@NgModule({
  declarations: [RuTradingHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RuTradingModule {}

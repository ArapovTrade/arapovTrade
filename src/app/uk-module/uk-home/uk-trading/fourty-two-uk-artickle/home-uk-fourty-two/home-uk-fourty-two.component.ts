import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-fourty-two',
  templateUrl: './home-uk-fourty-two.component.html',
  styleUrl: './home-uk-fourty-two.component.scss',
})
export class HomeUkFourtyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Таймфрейми в трейдингу: як обрати найкращий часовий інтервал? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розбираємо, які бувають таймфрейми в трейдингу, як обрати підходящий часовий інтервал і на якому таймфреймі краще торгувати новачкові. Повний гід для трейдерів.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

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
    this.titleService.setTitle('Таймфрейми в трейдингу: як обрати');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь про таймфрейми в трейдингу, як обрати часовий інтервал та який підходить новачкам. Посібник для трейдерів від ArapovTrade.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

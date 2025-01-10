import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-two',
  templateUrl: './home-uk-two.component.html',
  styleUrl: './home-uk-two.component.scss',
})
export class HomeUkTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Основи ринку. Словник термінів - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Повний посібник з основних термінів фінансового ринку. Розбираємо ключові поняття фондового, валютного та криптовалютного ринків, а також стратегії трейдингу та аналізу.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

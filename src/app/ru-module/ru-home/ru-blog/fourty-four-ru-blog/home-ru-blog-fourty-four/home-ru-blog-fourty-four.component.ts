import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fourty-four',
  templateUrl: './home-ru-blog-fourty-four.component.html',
  styleUrl: './home-ru-blog-fourty-four.component.scss',
})
export class HomeRuBlogFourtyFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Преимущества и риски криптостейкинга | ArapovTrade'

    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Преимущества и риски криптостейкинга: как зарабатывать на криптовалютах с минимальными рисками и избегать ошибок. Практические советы от ArapovTrade.',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-27' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptostaking.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fourty-six',
  templateUrl: './home-ru-blog-fourty-six.component.html',
  styleUrl: './home-ru-blog-fourty-six.component.scss',
})
export class HomeRuBlogFourtySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Bitcoin Pizza Day: история, значение и традиции - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте о Bitcoin Pizza Day: как была совершена первая покупка за биткоины, почему этот день стал историческим и как его отмечают в мире криптовалют.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-27' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pizzaday.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

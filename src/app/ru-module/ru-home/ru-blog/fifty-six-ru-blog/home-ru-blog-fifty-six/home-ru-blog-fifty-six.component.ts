import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fifty-six',
  templateUrl: './home-ru-blog-fifty-six.component.html',
  styleUrl: './home-ru-blog-fifty-six.component.scss',
})
export class HomeRuBlogFiftySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Книги по трейдингу: в чем польза для начинающих?'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Рассмотрим, как книги по трейдингу помогают начинающим трейдерам. Полезные рекомендации и лучшие книги для старта в мире финансовых рынков.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/benefitsoftradingbooks.jpg',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

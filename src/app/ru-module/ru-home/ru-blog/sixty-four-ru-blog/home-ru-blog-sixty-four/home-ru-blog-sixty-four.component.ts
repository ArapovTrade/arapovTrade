import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-sixty-four',
  templateUrl: './home-ru-blog-sixty-four.component.html',
  styleUrl: './home-ru-blog-sixty-four.component.scss',
})
export class HomeRuBlogSixtyFourComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Практические рекомендации по трейдингу - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Практические рекомендации по трейдингу, разбор графиков с примерами точек входа, мани-менеджмент и управление рисками.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-10' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/prakticrus.jpg',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

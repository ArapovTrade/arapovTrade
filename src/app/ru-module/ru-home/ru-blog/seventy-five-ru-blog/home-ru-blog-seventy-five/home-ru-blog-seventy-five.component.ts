import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-seventy-five',
  templateUrl: './home-ru-blog-seventy-five.component.html',
  styleUrl: './home-ru-blog-seventy-five.component.scss',
})
export class HomeRuBlogSeventyFiveComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Трейдинг – азартная игра или бизнес? Два психологических подхода - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Рассмотрим два психологических подхода к трейдингу: азартный и профессиональный. Разберем ключевые отличия между игрой и бизнесом, а также узнаем, какие стратегии помогают добиться успеха на финансовых рынках.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/gamblingorbusiness.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

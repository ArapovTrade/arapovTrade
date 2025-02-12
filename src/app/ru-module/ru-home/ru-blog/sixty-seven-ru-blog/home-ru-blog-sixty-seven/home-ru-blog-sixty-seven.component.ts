import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-sixty-seven',
  templateUrl: './home-ru-blog-sixty-seven.component.html',
  styleUrl: './home-ru-blog-sixty-seven.component.scss',
})
export class HomeRuBlogSixtySevenComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Почему важно анализировать объемы в рамках текущих трендов на рынке - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем, почему анализ объемов является ключевым инструментом в определении силы трендов, точек разворота и подтверждении рыночных движений. Узнайте, как объемный анализ помогает избежать ложных сигналов и торговать с высокой точностью.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-12' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trendvolumeanalysis.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

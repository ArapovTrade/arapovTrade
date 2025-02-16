import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-seventy-three',
  templateUrl: './home-ru-blog-seventy-three.component.html',
  styleUrl: './home-ru-blog-seventy-three.component.scss',
})
export class HomeRuBlogSeventyThreeComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Макроэкономические показатели фундаментального анализа - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Полное руководство по макроэкономическим показателям в фундаментальном анализе. Как ВВП, инфляция, ставки ФРС и другие индикаторы влияют на рынок?',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/macroeconomicindicators.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

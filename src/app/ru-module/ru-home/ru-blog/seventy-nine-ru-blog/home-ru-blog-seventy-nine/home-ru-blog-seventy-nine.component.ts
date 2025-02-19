import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-seventy-nine',
  templateUrl: './home-ru-blog-seventy-nine.component.html',
  styleUrl: './home-ru-blog-seventy-nine.component.scss',
})
export class HomeRuBlogSeventyNineComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Психология усреднения: почему новички теряют депозиты? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем психологические ловушки усреднения, почему трейдеры продолжают добавлять позиции в убыточные сделки и какие альтернативные стратегии помогут избежать слива депозита.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-19' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/psychologyofaveraging.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Психология усреднения: почему новички теряют депозиты?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

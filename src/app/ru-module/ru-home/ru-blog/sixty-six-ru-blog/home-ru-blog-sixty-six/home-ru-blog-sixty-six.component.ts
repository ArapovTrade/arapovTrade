import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-sixty-six',
  templateUrl: './home-ru-blog-sixty-six.component.html',
  styleUrl: './home-ru-blog-sixty-six.component.scss',
})
export class HomeRuBlogSixtySixComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Анализ объемов: как находить ключевые уровни | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как анализировать уровни максимального объема! Советы по поиску зон интереса, уровней поддержки и сопротивления для трейдинга с Arapov.trade',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-11' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/peakvolumelevels.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

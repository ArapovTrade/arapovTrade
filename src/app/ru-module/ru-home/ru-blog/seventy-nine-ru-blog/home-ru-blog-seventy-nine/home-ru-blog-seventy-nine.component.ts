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
      'Усреднение: психология потерь новичков | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Психологические ловушки усреднения в трейдинге: почему трейдеры увеличивают убыточные позиции и как альтернативные стратегии помогут сохранить депозит.',
    });
     
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/psychologyofaveraging.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Усреднение: психология потерь новичков | ArapovTrade',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

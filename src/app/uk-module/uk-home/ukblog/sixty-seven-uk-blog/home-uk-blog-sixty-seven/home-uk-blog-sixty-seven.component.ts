import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-sixty-seven',
  templateUrl: './home-uk-blog-sixty-seven.component.html',
  styleUrl: './home-uk-blog-sixty-seven.component.scss',
})
export class HomeUkBlogSixtySevenComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Чому важливо аналізувати обсяги в рамках поточних трендів на ринку - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розбираємо, чому аналіз обсягів є ключовим інструментом у визначенні сили трендів, точок розвороту та підтвердженні ринкових рухів. Дізнайтеся, як об`ємний аналіз допомагає уникати хибних сигналів і торгувати з високою точністю.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
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

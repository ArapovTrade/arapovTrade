import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-twenty-nine',
  templateUrl: './home-uk-twenty-nine.component.html',
  styleUrl: './home-uk-twenty-nine.component.scss',
})
export class HomeUkTwentyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Чому трейдери втрачають: пастки Smart Money');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, чому 90% трейдерів втрачають гроші, які пастки створюють Smart Money та як уникнути втрат. Посібник від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneytraps.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

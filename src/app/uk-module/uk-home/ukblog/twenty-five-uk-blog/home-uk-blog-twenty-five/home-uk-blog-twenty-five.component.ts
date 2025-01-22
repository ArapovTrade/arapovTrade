import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-twenty-five',
  templateUrl: './home-uk-blog-twenty-five.component.html',
  styleUrl: './home-uk-blog-twenty-five.component.scss',
})
export class HomeUkBlogTwentyFiveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Функції маркет-мейкерів на ринку криптовалют - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, які функції виконують маркет-мейкери на ринку криптовалют, їх роль у забезпеченні ліквідності, стабільності цін та розвитку торгівлі. Унікальний погляд на важливість маркет-мейкерів у криптоіндустрії.',
    });

    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptommakers.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-two',
  templateUrl: './home-uk-blog-two.component.html',
  styleUrl: './home-uk-blog-two.component.scss',
})
export class HomeUkBlogTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Дивергенція на індикаторах | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся про дивергенцію на індикаторах: що це, як розпізнавати, популярні стратегії та інструменти для аналізу від Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-13' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/divergenceonindecators.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

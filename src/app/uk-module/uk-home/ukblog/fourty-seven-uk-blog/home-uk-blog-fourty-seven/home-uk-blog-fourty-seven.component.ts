import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fourty-seven',
  templateUrl: './home-uk-blog-fourty-seven.component.html',
  styleUrl: './home-uk-blog-fourty-seven.component.scss',
})
export class HomeUkBlogFourtySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Фундаментальний Аналіз ринку - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Фундаментальний Аналіз | Об`ємний аналіз ринку',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-19' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/fundamentalanalysis.webp',
    });
    this.gerRandom();
  }

  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

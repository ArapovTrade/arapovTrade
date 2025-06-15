import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-eighty-five',
  templateUrl: './home-ru-blog-eighty-five.component.html',
  styleUrl: './home-ru-blog-eighty-five.component.scss',
})
export class HomeRuBlogEightyFiveComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Двойная вершина и двойное дно | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Двойная вершина и двойное дно: как торговать разворотные паттерны? Руководство от ArapovTrade по анализу и стратегиям',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/doubletopandbottom.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content:
        'Двойная вершина и двойное дно | ArapovTrade',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

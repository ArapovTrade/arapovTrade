import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-sixty-five',
  templateUrl: './home-ru-blog-sixty-five.component.html',
  styleUrl: './home-ru-blog-sixty-five.component.scss',
})
export class HomeRuBlogSixtyFiveComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Биржевой стакан и лента принтов: как читать | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как читать биржевой стакан и ленту принтов! Анализ заявок, ликвидности и сделок для выявления Smart Money и точек входа с Arapov.trade',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-11' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneystockorderbook.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

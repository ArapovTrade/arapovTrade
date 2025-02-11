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
      'Как читать Биржевой стакан и ленту принтов - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Полное руководство по чтению биржевого стакана и ленты принтов. Разбираем, как анализировать заявки, ликвидность и крупные сделки, чтобы определять намерения Smart Money и находить выгодные точки входа в рынок.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
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

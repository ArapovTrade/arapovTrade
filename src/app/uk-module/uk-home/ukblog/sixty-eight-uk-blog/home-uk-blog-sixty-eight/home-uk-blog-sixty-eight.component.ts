import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-sixty-eight',
  templateUrl: './home-uk-blog-sixty-eight.component.html',
  styleUrl: './home-uk-blog-sixty-eight.component.scss',
})
export class HomeUkBlogSixtyEightComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ринковий аукціон і сентимент трейдерів');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь про ринковий аукціон і сентимент ринку: аукціонна теорія, індикатори попиту та пропозиції в трейдингу від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-12' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/marketauctiondevelops.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-sixty-five',
  templateUrl: './home-uk-blog-sixty-five.component.html',
  styleUrl: './home-uk-blog-sixty-five.component.scss',
})
export class HomeUkBlogSixtyFiveComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Біржовий стакан і стрічка принтів');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, як читати біржовий стакан і стрічку принтів, аналізувати ліквідність і угоди Smart Money від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-11' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stockorderbook.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

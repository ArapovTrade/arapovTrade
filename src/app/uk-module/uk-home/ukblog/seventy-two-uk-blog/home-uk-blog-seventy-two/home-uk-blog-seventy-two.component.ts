import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-seventy-two',
  templateUrl: './home-uk-blog-seventy-two.component.html',
  styleUrl: './home-uk-blog-seventy-two.component.scss',
})
export class HomeUkBlogSeventyTwoComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Економічний календар: як використовувати');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, як економічний календар допомагає прогнозувати ринкові рухи та торгувати на новинах акцій і індексів від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economiccalendar.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

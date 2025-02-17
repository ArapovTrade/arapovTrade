import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-seventy-five',
  templateUrl: './home-uk-blog-seventy-five.component.html',
  styleUrl: './home-uk-blog-seventy-five.component.scss',
})
export class HomeUkBlogSeventyFiveComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Трейдинг – азартна гра чи бізнес? Два психологічні підходи - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розглянемо два психологічні підходи до трейдингу: азартний та професійний. Проаналізуємо ключові відмінності між грою та бізнесом, а також дізнаємося, які стратегії допомагають досягти успіху на фінансових ринках.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/gamblingorbusiness.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-eighty',
  templateUrl: './home-uk-blog-eighty.component.html',
  styleUrl: './home-uk-blog-eighty.component.scss',
})
export class HomeUkBlogEightyComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Фігура `Голова і плечі` - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розбираємо фігуру `Голова і плечі` – один із найнадійніших патернів технічного аналізу. Дізнайтеся, як правильно ідентифікувати цю фігуру, які сигнали підтверджують розворот тренду і які стратегії допоможуть ефективно торгувати за цим патерном.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-20' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/headandshoulders.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Фігура `Голова і плечі`',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

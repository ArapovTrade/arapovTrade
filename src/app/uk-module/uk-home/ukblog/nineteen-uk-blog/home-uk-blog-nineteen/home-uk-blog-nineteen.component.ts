import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-nineteen',
  templateUrl: './home-uk-blog-nineteen.component.html',
  styleUrl: './home-uk-blog-nineteen.component.scss',
})
export class HomeUkBlogNineteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Метод Вайкоффа в трейдингу - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Метод Вайкоффа – це потужний інструмент аналізу ринку, заснований на законах попиту і пропозиції. Дізнайтеся, як застосовувати Wyckoff Method для визначення трендів, точок входу та виходу з ринку.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

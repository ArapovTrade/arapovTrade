import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-twenty-one',
  templateUrl: './home-uk-blog-twenty-one.component.html',
  styleUrl: './home-uk-blog-twenty-one.component.scss',
})
export class HomeUkBlogTwentyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Як визначити маркетмейкера - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розбираємо, хто такі маркет-мейкери, як їх визначити на ринку, які стратегії вони використовують і як їх дії впливають на ціну. Повний посібник з аналізу великих гравців.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

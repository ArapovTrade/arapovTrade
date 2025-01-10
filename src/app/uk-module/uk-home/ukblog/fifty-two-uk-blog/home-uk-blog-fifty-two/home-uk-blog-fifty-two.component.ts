import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fifty-two',
  templateUrl: './home-uk-blog-fifty-two.component.html',
  styleUrl: './home-uk-blog-fifty-two.component.scss',
})
export class HomeUkBlogFiftyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Анатомія трендів на ринку - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розбираємо, що таке тренд на фінансовому ринку, його фази, типи та методи аналізу. Повний гід з анатомії трендів: індикатори, стратегії та принципи торгівлі.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

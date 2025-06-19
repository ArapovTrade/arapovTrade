import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-twenty-two',
  templateUrl: './home-uk-twenty-two.component.html',
  styleUrl: './home-uk-twenty-two.component.scss',
})
export class HomeUkTwentyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Економічні фактори у трейдингу | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, як економічні фактори впливають на валютні курси. Основні показники для аналізу ринку, трейдингу та ухвалення фінансових рішень.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-20' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economicfactors.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

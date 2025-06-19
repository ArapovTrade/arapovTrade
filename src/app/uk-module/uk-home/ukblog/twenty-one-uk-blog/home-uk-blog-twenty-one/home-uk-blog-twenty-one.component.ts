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
    this.titleService.setTitle('Як розпізнати маркет-мейкера в трейдингу');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, хто такі маркет-мейкери, як їх розпізнати на ринку, які стратегії вони застосовують і як це впливає на ціни від ArapovTrade.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

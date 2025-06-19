import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-twenty',
  templateUrl: './home-uk-blog-twenty.component.html',
  styleUrl: './home-uk-blog-twenty.component.scss',
})
export class HomeUkBlogTwentyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Що таке скам у криптовалюті | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Що таке скам у криптовалюті? Популярні шахрайські схеми та поради, як захистити кошти. Посібник для трейдерів та інвесторів від Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptoscam.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

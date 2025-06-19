import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fifty-six',
  templateUrl: './home-uk-blog-fifty-six.component.html',
  styleUrl: './home-uk-blog-fifty-six.component.scss',
})
export class HomeUkBlogFiftySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Книги з трейдингу для початківців');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, як книги з трейдингу допомагають початківцям: рекомендації та кращі видання для старту на фінансових ринках від ArapovTrade.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/benefitsoftradingbooks.jpg',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

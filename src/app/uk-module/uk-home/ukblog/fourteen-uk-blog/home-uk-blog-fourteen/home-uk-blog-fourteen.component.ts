import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fourteen',
  templateUrl: './home-uk-blog-fourteen.component.html',
  styleUrl: './home-uk-blog-fourteen.component.scss',
})
export class HomeUkBlogFourteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Трейдинг чи інвестиції: що обрати? | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Порівняння трейдингу та інвестицій: ключові переваги, ризики і що підійде саме вам для фінансового успіху.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-01' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/tradingandinvestments.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

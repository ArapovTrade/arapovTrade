import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-seven',
  templateUrl: './home-uk-blog-seven.component.html',
  styleUrl: './home-uk-blog-seven.component.scss',
})
export class HomeUkBlogSevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Як Заробляють у Трейдингу?');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, як заробляти у трейдингу, які інструменти та стратегії допоможуть вам досягти успіху. Розглянемо, що таке Форекс і як використовувати кредитне плече.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

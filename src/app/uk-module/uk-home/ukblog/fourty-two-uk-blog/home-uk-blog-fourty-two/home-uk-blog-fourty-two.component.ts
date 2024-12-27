import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fourty-two',
  templateUrl: './home-uk-blog-fourty-two.component.html',
  styleUrl: './home-uk-blog-fourty-two.component.scss',
})
export class HomeUkBlogFourtyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ризики криптовалют для початківців');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся основні ризики криптовалютного ринку для початківців трейдерів та інвесторів. Дізнайтеся, як управляти ризиками та мінімізувати втрати.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

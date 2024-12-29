import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
@Component({
  selector: 'app-home-eu-blog-fourty',
  templateUrl: './home-eu-blog-fourty.component.html',
  styleUrl: './home-eu-blog-fourty.component.scss',
})
export class HomeEuBlogFourtyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Why is trading so difficult? - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Discover why trading is considered a challenging profession and what factors make it so. Tips to overcome difficulties and achieve success.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

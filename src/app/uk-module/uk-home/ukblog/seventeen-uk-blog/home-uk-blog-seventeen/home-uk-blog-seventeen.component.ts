import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-seventeen',
  templateUrl: './home-uk-blog-seventeen.component.html',
  styleUrl: './home-uk-blog-seventeen.component.scss',
})
export class HomeUkBlogSeventeenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Міфи про трейдинг: правда і вигадки');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розвінчуємо міфи про трейдинг, які обманюють початківців і трейдерів: правда, помилки та поради від ArapovTrade.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

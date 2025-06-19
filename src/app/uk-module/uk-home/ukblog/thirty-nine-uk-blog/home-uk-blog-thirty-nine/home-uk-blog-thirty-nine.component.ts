import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-thirty-nine',
  templateUrl: './home-uk-blog-thirty-nine.component.html',
  styleUrl: './home-uk-blog-thirty-nine.component.scss',
})
export class HomeUkBlogThirtyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Де безпечно зберігати криптовалюту? | Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Де безпечно зберігати криптовалюту? Поради щодо вибору гаманців, принципи безпеки та найкращі практики захисту цифрових активів.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-23' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/safetostorecrypto.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-six',
  templateUrl: './home-uk-six.component.html',
  styleUrl: './home-uk-six.component.scss',
})
export class HomeUkSixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Алгоритмічні стейблкоїни - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розбираємо, що таке алгоритмічні стейблкоїни, як вони працюють, їх переваги та ризики. Дізнайтеся, чи варто використовувати цей вид криптовалюти.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-29' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stablecoins.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru',
  templateUrl: './home-ru.component.html',
  styleUrl: './home-ru.component.scss',
})
export class HomeRuComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('10 советов начинающим трейдерам');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Полезные советы для начинающих трейдеров. Узнайте, как управлять рисками, разрабатывать стратегию и избегать ошибок в трейдинге.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

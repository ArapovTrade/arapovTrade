import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-fourty-two',
  templateUrl: './home-ru-fourty-two.component.html',
  styleUrl: './home-ru-fourty-two.component.scss',
})
export class HomeRuFourtyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Таймфреймы в трейдинге: как выбрать лучший временной интервал? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем, какие бывают таймфреймы в трейдинге, как выбрать подходящий временной интервал и на каком таймфрейме лучше торговать новичку. Полное руководство для трейдеров.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

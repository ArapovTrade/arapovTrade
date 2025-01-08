import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fifty-three',
  templateUrl: './home-ru-blog-fifty-three.component.html',
  styleUrl: './home-ru-blog-fifty-three.component.scss',
})
export class HomeRuBlogFiftyThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ордер Блок в Трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Что такое ордер блок в трейдинге? Разбираем концепцию, методы определения и торговые стратегии. Полное руководство по ордерным блокам и их использованию в анализе рынка.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}

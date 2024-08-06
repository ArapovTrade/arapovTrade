import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-thirty-one',
  templateUrl: './home-ru-blog-thirty-one.component.html',
  styleUrl: './home-ru-blog-thirty-one.component.scss',
})
export class HomeRuBlogThirtyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Уровни Поддержки и Сопротивления - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Уровни Поддержки и Сопротивления ! Как определить ! Обучение трейдингу',
    });
  }
}

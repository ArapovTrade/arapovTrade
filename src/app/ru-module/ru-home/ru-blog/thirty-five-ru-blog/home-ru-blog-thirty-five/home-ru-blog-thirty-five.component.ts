import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-thirty-five',
  templateUrl: './home-ru-blog-thirty-five.component.html',
  styleUrl: './home-ru-blog-thirty-five.component.scss',
})
export class HomeRuBlogThirtyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основы Трейдинга для Начинающих - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основы Трейдинга для Начинающих | Обучение Трейдингу',
    });
  }
}

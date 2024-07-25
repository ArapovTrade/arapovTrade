import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-seven',
  templateUrl: './home-ru-blog-seven.component.html',
  styleUrl: './home-ru-blog-seven.component.scss',
})
export class HomeRuBlogSevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Как Зарабатывают в Трейдинге? - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Как Зарабатывают в Трейдинге? | Основы Трейдинга для Начинающих',
    });
  }
}

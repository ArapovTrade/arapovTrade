import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-thirty-seven',
  templateUrl: './home-ru-blog-thirty-seven.component.html',
  styleUrl: './home-ru-blog-thirty-seven.component.scss',
})
export class HomeRuBlogThirtySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Просадки в трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Просадки в трейдинге  | Основные ошибки трейдеров новичков',
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-thirty-eight',
  templateUrl: './home-ru-blog-thirty-eight.component.html',
  styleUrl: './home-ru-blog-thirty-eight.component.scss',
})
export class HomeRuBlogThirtyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Полный Курс по Концепции Смарт Мани - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Полный Курс по Концепции Смарт Мани | Смарт Мани в Трейдинге',
    });
  }
}

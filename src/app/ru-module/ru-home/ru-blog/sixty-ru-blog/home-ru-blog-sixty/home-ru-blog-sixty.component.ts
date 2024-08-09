import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-sixty',
  templateUrl: './home-ru-blog-sixty.component.html',
  styleUrl: './home-ru-blog-sixty.component.scss',
})
export class HomeRuBlogSixtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Трейдинг Vs Опционы сравнение инструментов - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Трейдинг Vs Опционы сравнение инструментов',
    });
  }
}

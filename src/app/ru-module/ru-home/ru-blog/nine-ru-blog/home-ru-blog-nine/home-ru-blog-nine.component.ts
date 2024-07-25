import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-nine',
  templateUrl: './home-ru-blog-nine.component.html',
  styleUrl: './home-ru-blog-nine.component.scss',
})
export class HomeRuBlogNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Как прогнозировать цену на рынке? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Как прогнозировать цену на рынке? Про Трейдинг для Начинающих',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-ten',
  templateUrl: './home-ru-blog-ten.component.html',
  styleUrl: './home-ru-blog-ten.component.scss',
})
export class HomeRuBlogTenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основная причина потерь в Трейдинге - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основная причина потерь в Трейдинге | Почему Трейдеры Теряют?',
    });
  }
}

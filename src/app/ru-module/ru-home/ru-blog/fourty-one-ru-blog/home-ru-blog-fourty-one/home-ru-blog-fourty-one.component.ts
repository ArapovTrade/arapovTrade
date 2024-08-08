import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fourty-one',
  templateUrl: './home-ru-blog-fourty-one.component.html',
  styleUrl: './home-ru-blog-fourty-one.component.scss',
})
export class HomeRuBlogFourtyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Правила для Успешного Трейдинга - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Простые Правила для Успешного Трейдинга | Логика Ликвидности',
    });
  }
}

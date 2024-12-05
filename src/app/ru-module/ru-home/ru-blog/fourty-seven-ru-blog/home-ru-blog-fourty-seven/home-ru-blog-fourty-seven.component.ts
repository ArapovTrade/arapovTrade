import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fourty-seven',
  templateUrl: './home-ru-blog-fourty-seven.component.html',
  styleUrl: './home-ru-blog-fourty-seven.component.scss',
})
export class HomeRuBlogFourtySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Фундаментальный Анализ рынка - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Фундаментальный анализ рынка: основы, преимущества и недостатки метода, влияние на трейдинг.',
    });
  }
}

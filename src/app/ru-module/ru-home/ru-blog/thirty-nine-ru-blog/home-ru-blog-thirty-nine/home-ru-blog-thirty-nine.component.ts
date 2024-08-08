import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-thirty-nine',
  templateUrl: './home-ru-blog-thirty-nine.component.html',
  styleUrl: './home-ru-blog-thirty-nine.component.scss',
})
export class HomeRuBlogThirtyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Объемный Анализ Рынка - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'SmartMoney| СМАРТ МАНИ | Объемный Анализ Рынка',
    });
  }
}

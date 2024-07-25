import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-six',
  templateUrl: './home-ru-blog-six.component.html',
  styleUrl: './home-ru-blog-six.component.scss',
})
export class HomeRuBlogSixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Смарт Мани - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Смарт Мани - Полный Курс по Трейдингу! Обучение трейдингу с нуля',
    });
  }
}

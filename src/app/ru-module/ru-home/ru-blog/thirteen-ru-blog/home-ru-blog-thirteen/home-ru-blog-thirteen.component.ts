import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-thirteen',
  templateUrl: './home-ru-blog-thirteen.component.html',
  styleUrl: './home-ru-blog-thirteen.component.scss',
})
export class HomeRuBlogThirteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Волны Эллиотта и Уровни Фибоначчи - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Волны Эллиотта и Уровни Фибоначчи | Обучение Трейдингу',
    });
  }
}

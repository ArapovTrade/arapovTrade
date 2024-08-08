import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fourty-one',
  templateUrl: './home-uk-blog-fourty-one.component.html',
  styleUrl: './home-uk-blog-fourty-one.component.scss',
})
export class HomeUkBlogFourtyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Правила для Успішного Трейдингу - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Прості Правила для Успішного Трейдингу | Логіка Ліквідності',
    });
  }
}

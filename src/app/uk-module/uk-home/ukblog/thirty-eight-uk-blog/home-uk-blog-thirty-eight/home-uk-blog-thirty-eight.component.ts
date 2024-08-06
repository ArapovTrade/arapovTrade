import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-thirty-eight',
  templateUrl: './home-uk-blog-thirty-eight.component.html',
  styleUrl: './home-uk-blog-thirty-eight.component.scss',
})
export class HomeUkBlogThirtyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Повний Курс Концепції Смарт Мані - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Повний Курс Концепції Смарт Мані | Смарт Мані у Трейдінгу',
    });
  }
}

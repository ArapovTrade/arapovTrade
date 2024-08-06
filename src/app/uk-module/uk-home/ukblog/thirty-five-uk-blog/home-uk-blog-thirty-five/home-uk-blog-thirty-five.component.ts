import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-thirty-five',
  templateUrl: './home-uk-blog-thirty-five.component.html',
  styleUrl: './home-uk-blog-thirty-five.component.scss',
})
export class HomeUkBlogThirtyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основи Трейдингу для Початківців - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основи Трейдингу для Початківців | Навчання Трейдінгу',
    });
  }
}

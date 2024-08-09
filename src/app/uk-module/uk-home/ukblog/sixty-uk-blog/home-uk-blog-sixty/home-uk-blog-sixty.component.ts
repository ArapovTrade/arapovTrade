import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-sixty',
  templateUrl: './home-uk-blog-sixty.component.html',
  styleUrl: './home-uk-blog-sixty.component.scss',
})
export class HomeUkBlogSixtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Трейдинг Vs Опціони порівняння інструментів - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Трейдинг Vs Опціони порівняння інструментів',
    });
  }
}

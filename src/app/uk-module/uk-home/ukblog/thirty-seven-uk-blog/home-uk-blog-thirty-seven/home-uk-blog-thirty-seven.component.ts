import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-thirty-seven',
  templateUrl: './home-uk-blog-thirty-seven.component.html',
  styleUrl: './home-uk-blog-thirty-seven.component.scss',
})
export class HomeUkBlogThirtySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Просадки у трейдингу - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Просадки в трейдингу | Основні помилки трейдерів новачків',
    });
  }
}

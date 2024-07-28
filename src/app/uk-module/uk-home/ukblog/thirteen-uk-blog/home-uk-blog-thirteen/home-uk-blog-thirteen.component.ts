import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-thirteen',
  templateUrl: './home-uk-blog-thirteen.component.html',
  styleUrl: './home-uk-blog-thirteen.component.scss',
})
export class HomeUkBlogThirteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Хвилі Елліотта та Рівні Фібоначчі - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Хвилі Елліотта та Рівні Фібоначчі | Навчання Трейдінгу',
    });
  }
}

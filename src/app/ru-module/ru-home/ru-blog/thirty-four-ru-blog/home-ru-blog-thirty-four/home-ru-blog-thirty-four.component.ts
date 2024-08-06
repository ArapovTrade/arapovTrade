import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-thirty-four',
  templateUrl: './home-ru-blog-thirty-four.component.html',
  styleUrl: './home-ru-blog-thirty-four.component.scss',
})
export class HomeRuBlogThirtyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Как выставлять стоп-лосс? - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Как выставлять стоп-лосс? Основы Трейдинга для новичков',
    });
  }
}

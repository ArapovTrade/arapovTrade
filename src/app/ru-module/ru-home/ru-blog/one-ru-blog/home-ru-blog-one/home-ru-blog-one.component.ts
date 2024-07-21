import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-one',
  templateUrl: './home-ru-blog-one.component.html',
  styleUrl: './home-ru-blog-one.component.scss',
})
export class HomeRuBlogOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Фазы рынка в трейдинге  - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Фазы рынка в трейдинге.',
    });
  }
}

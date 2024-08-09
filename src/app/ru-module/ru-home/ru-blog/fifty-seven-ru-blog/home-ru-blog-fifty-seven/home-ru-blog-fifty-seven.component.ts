import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fifty-seven',
  templateUrl: './home-ru-blog-fifty-seven.component.html',
  styleUrl: './home-ru-blog-fifty-seven.component.scss',
})
export class HomeRuBlogFiftySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Индикаторы в трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Индикаторы в трейдинге  - все плюсы и минусы использования',
    });
  }
}

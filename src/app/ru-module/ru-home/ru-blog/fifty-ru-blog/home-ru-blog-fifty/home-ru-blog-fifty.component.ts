import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fifty',
  templateUrl: './home-ru-blog-fifty.component.html',
  styleUrl: './home-ru-blog-fifty.component.scss',
})
export class HomeRuBlogFiftyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Алгоримические Ордера на Бирже - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Алгоримические Ордера на Бирже | Основы Трейдинга',
    });
  }
}

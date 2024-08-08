import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fourty-four',
  templateUrl: './home-ru-blog-fourty-four.component.html',
  styleUrl: './home-ru-blog-fourty-four.component.scss',
})
export class HomeRuBlogFourtyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основы трейдинга для начинающих - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основы трейдинга для начинающих: что такое трейдинг?',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-thirty-four',
  templateUrl: './home-uk-blog-thirty-four.component.html',
  styleUrl: './home-uk-blog-thirty-four.component.scss',
})
export class HomeUkBlogThirtyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Як виставляти стоп-лос? - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Як виставляти стоп-лос? Основи Трейдингу для новачків',
    });
  }
}

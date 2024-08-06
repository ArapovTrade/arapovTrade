import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-thirty-three',
  templateUrl: './home-ru-blog-thirty-three.component.html',
  styleUrl: './home-ru-blog-thirty-three.component.scss',
})
export class HomeRuBlogThirtyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Пин бар - Грааль трейдинга - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Пин бар - Грааль трейдинга',
    });
  }
}

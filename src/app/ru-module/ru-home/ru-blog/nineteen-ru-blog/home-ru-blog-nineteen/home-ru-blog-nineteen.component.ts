import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-nineteen',
  templateUrl: './home-ru-blog-nineteen.component.html',
  styleUrl: './home-ru-blog-nineteen.component.scss',
})
export class HomeRuBlogNineteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Смарт Мани - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Введение в Концепцию Смарт Мани',
    });
  }
}

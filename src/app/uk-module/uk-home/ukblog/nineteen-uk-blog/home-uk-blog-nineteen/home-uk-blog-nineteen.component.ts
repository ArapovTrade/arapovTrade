import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-nineteen',
  templateUrl: './home-uk-blog-nineteen.component.html',
  styleUrl: './home-uk-blog-nineteen.component.scss',
})
export class HomeUkBlogNineteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Смарт Мані - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Вступ до Концепції Смарт Мані',
    });
  }
}

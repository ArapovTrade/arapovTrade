import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-ten',
  templateUrl: './home-uk-blog-ten.component.html',
  styleUrl: './home-uk-blog-ten.component.scss',
})
export class HomeUkBlogTenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основна причина втрат у Трейдінгу - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основна причина втрат у Трейдінгу | Чому трейдери втрачають?',
    });
  }
}

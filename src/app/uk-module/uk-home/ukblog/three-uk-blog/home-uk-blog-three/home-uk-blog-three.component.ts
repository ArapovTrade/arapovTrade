import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-three',
  templateUrl: './home-uk-blog-three.component.html',
  styleUrl: './home-uk-blog-three.component.scss',
})
export class HomeUkBlogThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Волатильність у трейдінгу  - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Волатильність у трейдінгу - що це і як використовувати?',
    });
  }
}

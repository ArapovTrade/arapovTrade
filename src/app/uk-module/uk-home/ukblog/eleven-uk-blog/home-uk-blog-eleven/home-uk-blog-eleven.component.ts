import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-eleven',
  templateUrl: './home-uk-blog-eleven.component.html',
  styleUrl: './home-uk-blog-eleven.component.scss',
})
export class HomeUkBlogElevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Стартовий депозит Трейдера - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Стартовий депозит Трейдера: з якої суми краще починати?',
    });
  }
}

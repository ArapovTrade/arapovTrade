import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fifty-three',
  templateUrl: './home-uk-blog-fifty-three.component.html',
  styleUrl: './home-uk-blog-fifty-three.component.scss',
})
export class HomeUkBlogFiftyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ордер Блок у Трейдінгу - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Ордер Блок у Трейдінгу - що це і як використовувати?',
    });
  }
}

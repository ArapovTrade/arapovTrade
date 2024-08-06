import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home-uk-blog-thirty-three',
  templateUrl: './home-uk-blog-thirty-three.component.html',
  styleUrl: './home-uk-blog-thirty-three.component.scss',
})
export class HomeUkBlogThirtyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Пін бар - Грааль трейдингу - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Пін бар - Грааль трейдингу',
    });
  }
}

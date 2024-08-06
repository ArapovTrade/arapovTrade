import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-thirty-two',
  templateUrl: './home-ru-blog-thirty-two.component.html',
  styleUrl: './home-ru-blog-thirty-two.component.scss',
})
export class HomeRuBlogThirtyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Стоит ли покупать обучение трейдингу? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Стоит ли покупать обучение трейдингу?',
    });
  }
}

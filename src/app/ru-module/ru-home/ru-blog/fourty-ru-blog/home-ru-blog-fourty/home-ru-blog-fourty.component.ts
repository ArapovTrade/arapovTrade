import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fourty',
  templateUrl: './home-ru-blog-fourty.component.html',
  styleUrl: './home-ru-blog-fourty.component.scss',
})
export class HomeRuBlogFourtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Почему трейдинг такой сложный ? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Почему трейдинг такой сложный ?  Психология рынка',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fourty-two',
  templateUrl: './home-ru-blog-fourty-two.component.html',
  styleUrl: './home-ru-blog-fourty-two.component.scss',
})
export class HomeRuBlogFourtyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Риски криптовалют для начинающих - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Риски криптовалют для начинающих Трейдеров',
    });
  }
}

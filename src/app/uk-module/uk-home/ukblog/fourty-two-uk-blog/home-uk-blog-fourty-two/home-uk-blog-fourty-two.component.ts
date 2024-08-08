import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fourty-two',
  templateUrl: './home-uk-blog-fourty-two.component.html',
  styleUrl: './home-uk-blog-fourty-two.component.scss',
})
export class HomeUkBlogFourtyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Ризики криптовалют для початківців - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Ризики криптовалют для початківців Трейдерів',
    });
  }
}

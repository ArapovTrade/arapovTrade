import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fourty',
  templateUrl: './home-uk-blog-fourty.component.html',
  styleUrl: './home-uk-blog-fourty.component.scss',
})
export class HomeUkBlogFourtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Чому трейдинг такий складний? - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Чому трейдинг такий складний? Психологія ринку',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fourty-seven',
  templateUrl: './home-uk-blog-fourty-seven.component.html',
  styleUrl: './home-uk-blog-fourty-seven.component.scss',
})
export class HomeUkBlogFourtySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Фундаментальний Аналіз ринку - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Фундаментальний Аналіз | Об`ємний аналіз ринку',
    });
  }
}

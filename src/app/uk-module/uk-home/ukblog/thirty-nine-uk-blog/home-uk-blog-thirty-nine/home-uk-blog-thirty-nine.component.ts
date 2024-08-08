import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-thirty-nine',
  templateUrl: './home-uk-blog-thirty-nine.component.html',
  styleUrl: './home-uk-blog-thirty-nine.component.scss',
})
export class HomeUkBlogThirtyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Об`ємний Аналіз ринку - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'SmartMoney| СМАРТ МАНІ | Об`ємний Аналіз ринку',
    });
  }
}

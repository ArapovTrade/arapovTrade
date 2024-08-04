import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-twenty-seven',
  templateUrl: './home-ru-blog-twenty-seven.component.html',
  styleUrl: './home-ru-blog-twenty-seven.component.scss',
})
export class HomeRuBlogTwentySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Как читать японские свечи? - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Как читать японские свечи? Правильный способ для начинающих',
    });
  }
}

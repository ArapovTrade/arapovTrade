import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-twenty-one',
  templateUrl: './home-ru-blog-twenty-one.component.html',
  styleUrl: './home-ru-blog-twenty-one.component.scss',
})
export class HomeRuBlogTwentyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Как определить маркет мейкера - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Как определить маркет мейкера?',
    });
  }
}

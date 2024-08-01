import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-twenty-five',
  templateUrl: './home-ru-blog-twenty-five.component.html',
  styleUrl: './home-ru-blog-twenty-five.component.scss',
})
export class HomeRuBlogTwentyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Простая система трейдера - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Простая система трейдера',
    });
  }
}

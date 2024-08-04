import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-twenty-nine',
  templateUrl: './home-en-blog-twenty-nine.component.html',
  styleUrl: './home-en-blog-twenty-nine.component.scss',
})
export class HomeEnBlogTwentyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Quick Start in Trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Quick Start in Trading | How to become a trader?',
    });
  }
}

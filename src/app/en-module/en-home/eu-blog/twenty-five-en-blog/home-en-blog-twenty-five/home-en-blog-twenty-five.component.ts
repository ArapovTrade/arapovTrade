import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-twenty-five',
  templateUrl: './home-en-blog-twenty-five.component.html',
  styleUrl: './home-en-blog-twenty-five.component.scss',
})
export class HomeEnBlogTwentyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Simple trader system - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Simple trader system',
    });
  }
}

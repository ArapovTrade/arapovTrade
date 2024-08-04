import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-twenty-eight',
  templateUrl: './home-en-blog-twenty-eight.component.html',
  styleUrl: './home-en-blog-twenty-eight.component.scss',
})
export class HomeEnBlogTwentyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Smart Money - trading strategy - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Smart Money - The best strategy for trading! Smart Money concept!',
    });
  }
}

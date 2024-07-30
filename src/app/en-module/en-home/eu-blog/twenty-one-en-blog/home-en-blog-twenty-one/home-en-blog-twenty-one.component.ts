import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-twenty-one',
  templateUrl: './home-en-blog-twenty-one.component.html',
  styleUrl: './home-en-blog-twenty-one.component.scss',
})
export class HomeEnBlogTwentyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('How to identify a market maker - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'How to identify a market maker?',
    });
  }
}

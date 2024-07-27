import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-twelve',
  templateUrl: './home-en-blog-twelve.component.html',
  styleUrl: './home-en-blog-twelve.component.scss',
})
export class HomeEnBlogTwelveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Trading of levels - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Trading levels - basic rules of operation',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-twenty-six',
  templateUrl: './home-en-blog-twenty-six.component.html',
  styleUrl: './home-en-blog-twenty-six.component.scss',
})
export class HomeEnBlogTwentySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Types of orders on the exchange - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Types of orders on the exchange and their impact on the price',
    });
  }
}

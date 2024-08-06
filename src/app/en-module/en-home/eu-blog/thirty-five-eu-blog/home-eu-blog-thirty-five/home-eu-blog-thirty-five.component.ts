import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-thirty-five',
  templateUrl: './home-eu-blog-thirty-five.component.html',
  styleUrl: './home-eu-blog-thirty-five.component.scss',
})
export class HomeEuBlogThirtyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Trading Basics for Beginners - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Trading Basics for Beginners | Trading Training',
    });
  }
}

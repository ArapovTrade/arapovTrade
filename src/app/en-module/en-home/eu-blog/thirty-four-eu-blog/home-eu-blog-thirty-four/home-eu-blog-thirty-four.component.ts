import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-thirty-four',
  templateUrl: './home-eu-blog-thirty-four.component.html',
  styleUrl: './home-eu-blog-thirty-four.component.scss',
})
export class HomeEuBlogThirtyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('How to set a stop loss? - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'How to set a stop loss? Trading Basics for Beginners',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-five',
  templateUrl: './home-en-blog-five.component.html',
  styleUrl: './home-en-blog-five.component.scss',
})
export class HomeEnBlogFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Pricing and Liquidity - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Pricing and Liquidity | What is it and how to use it?',
    });
  }
}

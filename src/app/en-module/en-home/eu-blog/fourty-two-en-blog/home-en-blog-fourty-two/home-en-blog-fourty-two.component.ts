import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-fourty-two',
  templateUrl: './home-en-blog-fourty-two.component.html',
  styleUrl: './home-en-blog-fourty-two.component.scss',
})
export class HomeEnBlogFourtyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Risks of cryptocurrencies for beginners - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Risks of Cryptocurrency for Beginner Traders',
    });
  }
}

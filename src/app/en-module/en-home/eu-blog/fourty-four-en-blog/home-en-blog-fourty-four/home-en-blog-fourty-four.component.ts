import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-fourty-four',
  templateUrl: './home-en-blog-fourty-four.component.html',
  styleUrl: './home-en-blog-fourty-four.component.scss',
})
export class HomeEnBlogFourtyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Trading Basics for Beginners - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Trading Basics for Beginners: What is Trading?',
    });
  }
}

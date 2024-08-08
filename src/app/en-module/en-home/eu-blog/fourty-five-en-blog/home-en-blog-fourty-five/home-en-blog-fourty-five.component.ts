import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-fourty-five',
  templateUrl: './home-en-blog-fourty-five.component.html',
  styleUrl: './home-en-blog-fourty-five.component.scss',
})
export class HomeEnBlogFourtyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'How to use moving averages in Trading? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'How to use moving averages in Trading?',
    });
  }
}

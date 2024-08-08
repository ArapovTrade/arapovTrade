import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-fourty-three',
  templateUrl: './home-en-blog-fourty-three.component.html',
  styleUrl: './home-en-blog-fourty-three.component.scss',
})
export class HomeEnBlogFourtyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Smart Money - the strategy used by banks to trade - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Smart Money - the strategy that Banks use to trade! Trading training',
    });
  }
}

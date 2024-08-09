import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-fifty-nine',
  templateUrl: './home-eu-blog-fifty-nine.component.html',
  styleUrl: './home-eu-blog-fifty-nine.component.scss',
})
export class HomeEuBlogFiftyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      ' How to trade Level Breakout in trading - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: ' How to trade Level Breakout in trading',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-fifty-three',
  templateUrl: './home-eu-blog-fifty-three.component.html',
  styleUrl: './home-eu-blog-fifty-three.component.scss',
})
export class HomeEuBlogFiftyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Block Order in Trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Order Block in Trading, what is it and how to use it?',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-fourty-eight',
  templateUrl: './home-en-blog-fourty-eight.component.html',
  styleUrl: './home-en-blog-fourty-eight.component.scss',
})
export class HomeEnBlogFourtyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Instructions for self-study in Trading - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Instructions for self-study in Trading',
    });
  }
}

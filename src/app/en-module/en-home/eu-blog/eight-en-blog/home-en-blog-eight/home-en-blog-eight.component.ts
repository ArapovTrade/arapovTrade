import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-eight',
  templateUrl: './home-en-blog-eight.component.html',
  styleUrl: './home-en-blog-eight.component.scss',
})
export class HomeEnBlogEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Imbalance in trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Imbalance in trading: what is it and how to use it?',
    });
  }
}

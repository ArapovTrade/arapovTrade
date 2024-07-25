import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-ten',
  templateUrl: './home-en-blog-ten.component.html',
  styleUrl: './home-en-blog-ten.component.scss',
})
export class HomeEnBlogTenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'The main reason for losses in Trading - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'The main reason for losses in Trading | Why Traders Lose?',
    });
  }
}

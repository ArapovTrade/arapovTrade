import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-four',
  templateUrl: './home-en-blog-four.component.html',
  styleUrl: './home-en-blog-four.component.scss',
})
export class HomeEnBlogFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'The main reasons for losing a deposit  - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'The main reasons for losing a deposit in Trading',
    });
  }
}

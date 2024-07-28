import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-fourteen',
  templateUrl: './home-en-blog-fourteen.component.html',
  styleUrl: './home-en-blog-fourteen.component.scss',
})
export class HomeEnBlogFourteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Trading and Investments. What is better? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Trading and Investments. What is better? | Advantages and disadvantages',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-eleven',
  templateUrl: './home-en-blog-eleven.component.html',
  styleUrl: './home-en-blog-eleven.component.scss',
})
export class HomeEnBlogElevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle("Trader's starting deposit - Arapov.trade");
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: "Trader's starting deposit: what amount is best to start with?",
    });
  }
}

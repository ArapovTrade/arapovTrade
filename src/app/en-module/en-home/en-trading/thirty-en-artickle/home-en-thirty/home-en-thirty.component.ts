import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-thirty',
  templateUrl: './home-en-thirty.component.html',
  styleUrl: './home-en-thirty.component.scss',
})
export class HomeEnThirtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Types and Kinds of Orders - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Types and types of orders on the exchange',
    });
  }
}

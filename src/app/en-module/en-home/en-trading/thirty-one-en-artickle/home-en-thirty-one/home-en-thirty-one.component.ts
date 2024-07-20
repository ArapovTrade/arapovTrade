import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-thirty-one',
  templateUrl: './home-en-thirty-one.component.html',
  styleUrl: './home-en-thirty-one.component.scss',
})
export class HomeEnThirtyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Market Order - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Market orders: what are they and how to use them?',
    });
  }
}

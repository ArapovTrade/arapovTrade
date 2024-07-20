import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-twenty-three',
  templateUrl: './home-en-twenty-three.component.html',
  styleUrl: './home-en-twenty-three.component.scss',
})
export class HomeEnTwentyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('World Stock Indices - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Stock market, major indices',
    });
  }
}

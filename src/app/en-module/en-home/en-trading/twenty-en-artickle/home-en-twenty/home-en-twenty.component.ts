import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-twenty',
  templateUrl: './home-en-twenty.component.html',
  styleUrl: './home-en-twenty.component.scss',
})
export class HomeEnTwentyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Fundamental Market Analysis - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Fundamental market analysis. Trading',
    });
  }
}

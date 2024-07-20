import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-twenty-eight',
  templateUrl: './home-en-twenty-eight.component.html',
  styleUrl: './home-en-twenty-eight.component.scss',
})
export class HomeEnTwentyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Key Price Patterns in Technical Analysis - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Technical analysis price patterns',
    });
  }
}

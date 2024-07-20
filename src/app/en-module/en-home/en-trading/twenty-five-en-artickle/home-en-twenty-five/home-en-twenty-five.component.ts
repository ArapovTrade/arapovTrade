import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-twenty-five',
  templateUrl: './home-en-twenty-five.component.html',
  styleUrl: './home-en-twenty-five.component.scss',
})
export class HomeEnTwentyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Key Economic Growth Indicators - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Main indicators of economic growth',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-twenty-six',
  templateUrl: './home-en-twenty-six.component.html',
  styleUrl: './home-en-twenty-six.component.scss',
})
export class HomeEnTwentySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Technical Market Analysis - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Technical market analysis. Trading',
    });
  }
}

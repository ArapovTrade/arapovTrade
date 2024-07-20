import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-twenty-nine',
  templateUrl: './home-en-twenty-nine.component.html',
  styleUrl: './home-en-twenty-nine.component.scss',
})
export class HomeEnTwentyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Volume Market Analysis - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Volumetric market analysis.  Trading',
    });
  }
}

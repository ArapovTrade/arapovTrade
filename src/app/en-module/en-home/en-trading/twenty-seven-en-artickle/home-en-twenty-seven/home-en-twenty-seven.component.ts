import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-twenty-seven',
  templateUrl: './home-en-twenty-seven.component.html',
  styleUrl: './home-en-twenty-seven.component.scss',
})
export class HomeEnTwentySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Technical Market Analysis. Main Types of Chart - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Main types of chart display in trading',
    });
  }
}

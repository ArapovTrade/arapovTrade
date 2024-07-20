import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-thirty-seven',
  templateUrl: './home-en-thirty-seven.component.html',
  styleUrl: './home-en-thirty-seven.component.scss',
})
export class HomeEnThirtySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Separation of trading systems. Automation - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Types of trading systems in trading',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-thirty-eight',
  templateUrl: './home-en-thirty-eight.component.html',
  styleUrl: './home-en-thirty-eight.component.scss',
})
export class HomeEnThirtyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Specifics of Capital Management in Trading - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Money management in trading',
    });
  }
}

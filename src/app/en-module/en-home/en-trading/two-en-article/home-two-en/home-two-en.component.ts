import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-two-en',
  templateUrl: './home-two-en.component.html',
  styleUrl: './home-two-en.component.scss',
})
export class HomeTwoEnComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Market Fundamentals. Glossary of terms - Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Market Fundamentals. A brief dictionary of trader terms',
    });
  }
}

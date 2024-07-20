import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-thirty-two',
  templateUrl: './home-en-thirty-two.component.html',
  styleUrl: './home-en-thirty-two.component.scss',
})
export class HomeEnThirtyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Stop Order - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Stop orders, what  they are and how to use them?',
    });
  }
}

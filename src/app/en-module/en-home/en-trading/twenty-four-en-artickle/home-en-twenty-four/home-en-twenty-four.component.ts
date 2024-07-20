import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-twenty-four',
  templateUrl: './home-en-twenty-four.component.html',
  styleUrl: './home-en-twenty-four.component.scss',
})
export class HomeEnTwentyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Economic State of the Country - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Economy of the State',
    });
  }
}

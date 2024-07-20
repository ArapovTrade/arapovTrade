import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-twenty-two',
  templateUrl: './home-en-twenty-two.component.html',
  styleUrl: './home-en-twenty-two.component.scss',
})
export class HomeEnTwentyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Economic Factors - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Economic factors in trading',
    });
  }
}

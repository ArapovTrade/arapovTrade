import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-five-en',
  templateUrl: './home-five-en.component.html',
  styleUrl: './home-five-en.component.scss',
})
export class HomeFiveEnComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'What are futures? Derivatives and their types',
    });
  }
}

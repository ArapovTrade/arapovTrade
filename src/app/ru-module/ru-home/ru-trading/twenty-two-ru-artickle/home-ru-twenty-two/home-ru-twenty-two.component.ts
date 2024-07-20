import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-twenty-two',
  templateUrl: './home-ru-twenty-two.component.html',
  styleUrl: './home-ru-twenty-two.component.scss',
})
export class HomeRuTwentyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Экономические факторы - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Экономические факторы в трейдинге ',
    });
  }
}

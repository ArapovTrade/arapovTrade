import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-seventeen',
  templateUrl: './home-uk-seventeen.component.html',
  styleUrl: './home-uk-seventeen.component.scss',
})
export class HomeUkSeventeenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Неринкові ризики Форекс - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Які бувають ризики у трейдингу?',
    });
  }
}

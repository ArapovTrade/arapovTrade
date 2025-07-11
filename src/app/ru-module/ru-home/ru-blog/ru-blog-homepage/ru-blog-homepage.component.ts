
import {   Inject,Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { ArticlesService } from '../../../../servises/articles.service';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LangService } from '../../../../servises/lang.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-ru-blog-homepage',
  templateUrl: './ru-blog-homepage.component.html',
  styleUrl: './ru-blog-homepage.component.scss',
})
export class RuBlogHomepageComponent implements OnInit {
  @ViewChild('scrollToTop') scrollToTop!: ElementRef;
  @ViewChild(MatPaginator) paginatorr!: MatPaginator;

  constructor(
    private lang: LangService,
    private artickleServ: ArticlesService,
    private paginator: MatPaginatorIntl,
    @Inject(DOCUMENT) private document: Document,

    private router: Router,
    private meta: Meta,
    private titleService: Title
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
  }
  filteredArticles: any = [];
  rusGroups: any = [];
  ngOnInit(): void {
     
    this.lang.setNumber(2);
    this.paginator.itemsPerPageLabel = '';

    this.titleService.setTitle(
      'Бесплатное обучение трейдингу от Игоря Арапова'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'keywords',
      content:
        'Бесплатное обучение трейдингу , обучение трейдингу с нуля бесплатно,  курсы по трейдингу бесплатно,  обучение трейдингу бесплатно, обучение трейдингу криптовалют, трейдинг с нуля',
    });
    this.meta.addTag({
      name: 'description',
      content: 'Бесплатное обучение трейдингу от Игоря Арапова: пошаговый курс с нуля, разбор стратегий, управление рисками и практические занятия.',
    });
     

    this.filteredArticles = this.artickleServ.russianssArticles();
    this.rusGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updatePaginatedArticles();
  }
  grr!: any;
  checkedGroup!: any;
  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      this.artickleServ.selectedGroups.push(value);
      this.filteredArticles = this.artickleServ.russianssArticles();
      this.updatePaginatedArticles();
    } else {
      this.artickleServ.selectedGroups =
        this.artickleServ.selectedGroups.filter((group) => group !== value);
      this.filteredArticles = this.artickleServ.russianssArticles();
      this.updatePaginatedArticles();
    }
    this.paginatorr.firstPage();
  }
  paginatedArticles = []; // Статьи для отображения на текущей странице
  currentPage = 0;
  pageSize = 150;
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedArticles();
    this.scrollToTop.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  updatePaginatedArticles() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedArticles = this.filteredArticles.slice(startIndex, endIndex);
    this.checkedGroup = this.artickleServ.selectedGroups;
  }
  navigateToStudy() {
    this.router.navigateByUrl('/ru/studying');
  }

 
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

import { PageEvent } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../servises/articles.service';
import { LangService } from '../../../../servises/lang.service';

@Component({
  selector: 'app-en-blog-homepage',
  templateUrl: './en-blog-homepage.component.html',
  styleUrl: './en-blog-homepage.component.scss',
})
export class EnBlogHomepageComponent implements OnInit {
  @ViewChild('scrollToTop') scrollToTop!: ElementRef;
  @ViewChild(MatPaginator) paginatorr!: MatPaginator;

  constructor(
    private artickleServ: ArticlesService,
    private router: Router,
    private meta: Meta,
    private titleService: Title,
    private paginator: MatPaginatorIntl,
    private lang: LangService
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
  enGroups: any = [];
  ngOnInit(): void {
    this.paginator.itemsPerPageLabel = '';
    this.lang.setNumber(3);
    this.titleService.setTitle('Free trading training from Igor Arapov');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'keywords',
      content:
        'cryptocurrency trading training, trading from scratch, Free trading training, free trading training from scratch, free trading courses, free trading training',
    });
    this.meta.addTag({
      name: 'description',
      content: 'Free trading training from Igor Arapov',
    });
    this.filteredArticles = this.artickleServ.englishArticles();
    this.enGroups = this.artickleServ.getEnglishGroups();
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
      this.filteredArticles = this.artickleServ.englishArticles();
      this.updatePaginatedArticles();
    } else {
      this.artickleServ.selectedGroups =
        this.artickleServ.selectedGroups.filter((group) => group !== value);
      this.filteredArticles = this.artickleServ.englishArticles();
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
    this.router.navigateByUrl('/en/studying');
  }
}

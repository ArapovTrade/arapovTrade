import {  Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../servises/articles.service';
import { PageEvent } from '@angular/material/paginator';
import { LangService } from '../../../../servises/lang.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-uk-blog-homepage',
  templateUrl: './uk-blog-homepage.component.html',
  styleUrl: './uk-blog-homepage.component.scss',
})
export class UkBlogHomepageComponent implements OnInit {
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
  ukrGroups: any = [];
  ngOnInit(): void {
     

    this.paginator.itemsPerPageLabel = '';
    this.lang.setNumber(1);
    this.titleService.setTitle(
      'Безкоштовне навчання трейдингу від Ігоря Арапова'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Безкоштовне навчання трейдингу від Ігоря Арапова —  онлайн-курс з нуля для тих, хто хоче впевнено розпочати шлях на фінансових ринках.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'Безкоштовне навчання трейдингу, навчання трейдингу з нуля безкоштовно, курси з трейдингу безкоштовно, навчання трейдингу безкоштовно, навчання трейдингу криптовалют, трейдинг з нуля',
    });

    this.filteredArticles = this.artickleServ.ukrainiansArticles();
    this.ukrGroups = this.artickleServ.getUkrainianGroups();
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
      this.filteredArticles = this.artickleServ.ukrainiansArticles();
      this.updatePaginatedArticles();
    } else {
      this.artickleServ.selectedGroups =
        this.artickleServ.selectedGroups.filter((group) => group !== value);
      this.filteredArticles = this.artickleServ.ukrainiansArticles();
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
    // this.scrollToTop.nativeElement.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    // });
    const topPosition = this.scrollToTop.nativeElement.offsetTop;
    window.scrollTo({
      top: topPosition,
      behavior: 'smooth',
    });
  }
  updatePaginatedArticles() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedArticles = this.filteredArticles.slice(startIndex, endIndex);
    this.checkedGroup = this.artickleServ.selectedGroups;
  }

  navigateToStudy() {
    this.router.navigateByUrl('/uk/studying');
  }
 
}

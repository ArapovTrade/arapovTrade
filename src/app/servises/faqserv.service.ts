import { Injectable } from '@angular/core';
 
import { FaqRuAuthorService } from './faqservices/faq-ru-author.service';
import { FaqRuCourseService } from './faqservices/faq-ru-course.service';

import { FaqRuOwlService } from './faqservices/faq-ru-owl.service';
import { FaqRuPagesService } from './faqservices/faq-ru-pages.service';
import { FaqUKCourseService } from './faqservices/faq-ukcourse.service';
import { FaqUkAuthorService } from './faqservices/faq-uk-author.service';
import { FaqUkOwlService } from './faqservices/faq-uk-owl.service';
import { FaqUkPagesService } from './faqservices/faq-uk-pages.service';

interface arrayFAQ {
  question: string;
  answer: string;
}
@Injectable({
  providedIn: 'root',
})
export class FaqservService {
  faqs!: Array<arrayFAQ>;

  languageForFAQ = 'uk';

  constructor(
    
    private faqRuAut: FaqRuAuthorService,

    private faqUkAut: FaqUkAuthorService,
    private faqRuOwl: FaqRuOwlService,
    private faqUkOwl: FaqUkOwlService,
    private faqRuPages: FaqRuPagesService,
    private faqUkPages: FaqUkPagesService,
    private faqRuCrs: FaqRuCourseService,
    private faqUkCrs: FaqUKCourseService
  ) {}

  returnSchema(langcode: string, path: string) {
    

    this.faqs =
      path === '' || (langcode === 'uk' && path === 'uk')
        ? this.faqUkAut.getFaq()
        : langcode === 'ru' && path === 'ru'
        ? this.faqRuAut.getFaq()
        : langcode === 'ru' && path === 'ru/studying'
        ? this.faqRuCrs.getFaq()
        : langcode === 'uk' && path === 'uk/studying'
        ? this.faqUkCrs.getFaq()
        : langcode === 'uk' && path === 'uk/freestudying/freeeducation'
        ? this.faqUkOwl.getFaq()
        : langcode === 'ru' && path === 'ru/freestudying/freeeducation'
        ? this.faqRuOwl.getFaq()
        : langcode === 'ru'
        ? this.faqRuPages.getFaq()
        : this.faqUkPages.getFaq();

    let schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    };
    return schema;
  }
}

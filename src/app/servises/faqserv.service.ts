import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
interface arrayFAQ {
  question: string;
  answer: string;
}
@Injectable({
  providedIn: 'root',
})
export class FaqservService {
  faqs!: Array<arrayFAQ>;

  

faqsUkrPages=[
     {
      question: 'Як змінити мову сайту?',
      answer:
        'У правому верхньому куті натисніть на іконку прапора і виберіть потрібну вам мову.',
    },
     {
      question: 'Як зв’язатися з нами?',
      answer:
        'Юридична адреса з реєстрацією доступна для всіх бажаючих на головній сторінці сайту з детальним зазначенням контактної інформації.',
    },
    {
      question: 'Які розділи трейдингу безкоштовні?',
      answer:
        'Безкоштовне навчання трейдингу включає наступні розділи: Вступ до трейдингу, Технічний аналіз, Об’ємний аналіз, Концепція Smart Money, Психологія трейдингу, Фундаментальний аналіз, Криптовалюти, Приклади угод.',
    },
    {
      question: 'Чи потрібні спеціальні програми або платформи для проходження курсу?',
      answer:
        'Ні, всі матеріали доступні онлайн через ваш веб-браузер. Однак для практики трейдингу рекомендується встановити торгову платформу, яка підходить для ваших цілей.',
    },
    {
      question: 'Як записатися на платний курс з наставником?',
      answer:
        'Контактна інформація для зв’язку вказана на сайті. Ви можете використовувати надані засоби зв’язку для отримання додаткової інформації або консультацій.',
    },
  ]

 
  constructor(@Inject(DOCUMENT) private document: Document) {}

  returnSchema(langcode: string, path:string) {

    

      // if(path==''){
      //   this.faqs=this.faqsUkrAuthor
      // }else if(langcode == 'uk'&&path=='uk'){
      //    this.faqs=this.faqsUkrAuthor
      // }else if(langcode == 'ru'&&path=='ru'){
      //    this.faqs=this.faqsRuAuthor
      // }else if(langcode == 'ru'&&path=='ru/studying'){
      //    this.faqs=this.faqsRuCourse
      // }
      // else if(langcode == 'uk'&&path=='uk/studying'){
      //    this.faqs=this.faqsUkrCourse
      // }
      // else if(langcode == 'uk'&&path=='uk/freestudying/freeeducation'){
      //    this.faqs=this.faqsUkrOwl
      // }
      // else if(langcode == 'ru'&&path=='ru/freestudying/freeeducation'){
      //    this.faqs=this.faqsUkrOwl
      // }
      // else if(langcode == 'ru'){
      //    this.faqs=this.faqsRuPages
      // }else{
      //   this.faqs=this.faqsUkrPages
      // }



this.faqs=this.faqsUkrPages
 

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

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MixinService {
  getIdFromSeo(seo: string, splitter: string): number {
    if (!seo)
    return ;
    let seoArr: Array<any> = seo?.split(splitter);
    let id: number = seoArr[seoArr.length - 1];

    return id;
  }
  constructor(private router: Router) {}

  getFirstWord(sentence: string): string {
    if (!sentence) {
      return '';
    }
    return sentence?.split(' ')[0];
  }

  getRoute(seo, id) {
    const detailsUrl: string = `/product/${seo}-${id}`;
    this.router.navigate([detailsUrl]);
  }

  parseThousand(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
  }

  purchasePrice(price: number, discount: number = 0) {
    return ((100 - discount) * price) / 100;
  }
}

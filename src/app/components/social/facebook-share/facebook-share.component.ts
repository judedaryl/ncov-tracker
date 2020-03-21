import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facebook-share',
  template: `
  <div 
    class="fb-share-button" 
    data-href="https://judedaryl.github.io/ncov-tracker/" 
    data-layout="button_count" 
    data-size="large">
      <a 
      target="_blank" 
      href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fjudedaryl.github.io%2Fncov-tracker%2F&amp;src=sdkpreparse" 
      class="fb-xfbml-parse-ignore">
        Share
      </a>
  </div>
  `,
  styles: []
})
export class FacebookShareComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twitter-tweet',
  template: `
  <a class="twitter-share-button"
    href="https://twitter.com/intent/tweet?text=Mobile friendly COVID-19 Tracker for the Philippines"
    data-size="large">
  Tweet</a>
  `,
  styles: []
})
export class TwitterTweetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

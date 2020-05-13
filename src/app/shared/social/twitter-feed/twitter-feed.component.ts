import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-twitter-feed",
  template: `
    <a
      class="twitter-timeline"
      data-height="500"
      data-dnt="true"
      data-theme="light"
      href="https://twitter.com/DOHgovph?ref_src=twsrc%5Etfw"
    >
      Tweets by DOHgovph
    </a>
    <script
      async
      src="https://platform.twitter.com/widgets.js"
      charset="utf-8"
    ></script>
  `,
  styles: [],
})
export class TwitterFeedComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

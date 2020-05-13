import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-facebook-feed",
  template: `
    <div
      class="fb-page"
      data-href="https://www.facebook.com/pg/OfficialDOHgov"
      data-tabs="timeline"
      data-width=""
      data-height="800"
      data-small-header="true"
      data-adapt-container-width="true"
      data-hide-cover="true"
      data-show-facepile="true"
    >
      <blockquote
        cite="https://www.facebook.com/pg/OfficialDOHgov"
        class="fb-xfbml-parse-ignore"
      >
        <a href="https://www.facebook.com/pg/OfficialDOHgov"
          >Department of Health (Philippines)</a
        >
      </blockquote>
    </div>
  `,
  styles: [],
})
export class FacebookFeedComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

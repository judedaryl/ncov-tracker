import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TwitterTweetComponent } from "./twitter-tweet.component";

describe("TwitterTweetComponent", () => {
  let component: TwitterTweetComponent;
  let fixture: ComponentFixture<TwitterTweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterTweetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

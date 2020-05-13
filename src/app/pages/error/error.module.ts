import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ErrorRoutingModule } from "./error-routing.module";
import { NotfoundComponent } from "./notfound/notfound.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [NotfoundComponent],
  imports: [CommonModule, ErrorRoutingModule, SharedModule],
})
export class ErrorModule {}

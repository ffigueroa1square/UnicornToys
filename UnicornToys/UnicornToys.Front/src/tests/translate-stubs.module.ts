import { NgModule } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { TranslatePipeStub } from "./translate-pipe-stub";
import { TranslationServiceStub } from "./translation-service-stub";

@NgModule({
    declarations: [
      TranslatePipeStub,
    ],
    exports: [
      TranslatePipeStub,
    ],
    providers: [
      { provide: TranslateService, useClass: TranslationServiceStub },
    ],
  })
   export class TranslateStubsModule { }
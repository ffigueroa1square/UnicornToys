import { TranslateService } from "@ngx-translate/core";
import { InjectorInstance } from "src/app/app.module";

export class AppResources {
    public static getMessage(key: string): string {
        let text = '';

        if (InjectorInstance) {
            const translateService = InjectorInstance.get<TranslateService>(TranslateService);
            translateService.get(key).subscribe(item => {
                text = item;
            });
        }

        return text;
    }
}
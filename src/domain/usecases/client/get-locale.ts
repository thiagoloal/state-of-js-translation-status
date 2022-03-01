import { LocaleStatus } from "../../models/LocaleStatus";

export interface LocaleTranslation {
	status: (locale: string) => Promise<LocaleStatus>;
}

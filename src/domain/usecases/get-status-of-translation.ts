import { Locale } from "../models/Locale";

export interface StatusOfTranslation {
	status: (locale: string) => Promise<Locale>;
}

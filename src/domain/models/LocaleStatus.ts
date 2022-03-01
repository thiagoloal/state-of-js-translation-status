import { Context } from "./Context";

export interface LocaleStatus {
  id:string;
	completion: number;
	totalCount: number;
	translatedCount: number;
	label: string;
	contexts?: Context[];
}

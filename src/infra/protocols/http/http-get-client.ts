import { AvaiableQueries } from "src/infra/helpers/queries/avaiable";
import { HttpResponse } from ".";

export interface HttpGetParams {
	url: string;
	headers?: any;
	queryName?: AvaiableQueries;
  queryValues?: Object;
	query?: string;
}

export interface HttpGetClient<R = any> {
	get: (params: HttpGetParams) => Promise<R>;
}

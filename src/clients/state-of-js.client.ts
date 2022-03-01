import { LocaleStatus } from "../domain/models/LocaleStatus";
import { Locale } from "../domain/models/Locale";
import { StatusOfTranslation } from "../domain/usecases/get-status-of-translation";
import { AvaiableQueries } from "../infra/helpers/queries/avaiable";
import { HttpGetClient, HttpGetParams } from "../infra/protocols/http";
import { STATE_OF_JS_API } from './config/constants';

export class StateOfJs implements StatusOfTranslation {
	constructor(
		private httpClient: HttpGetClient<Locale>
	) {}

  async status(locale: string) {
    const params: HttpGetParams = {
      url: STATE_OF_JS_API,
      queryName: AvaiableQueries.LOCALE,
      queryValues: {
        locale
      }
    }
    const response = await this.httpClient.get(params)
    return response;
  }
}

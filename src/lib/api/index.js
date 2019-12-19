import 'whatwg-fetch';
import { HOST } from 'constants/refs';
import storage from 'constants/localStorage';

export default class Api {

    static get = (...args) => Api.httpRequest(Api.httpConfig('GET', ...args))
    static post = (...args) => Api.httpRequest(Api.httpConfig('POST', ...args))
    static put = (...args) => Api.httpRequest(Api.httpConfig('PUT', ...args))
    static delete = (...args) => Api.httpRequest(Api.httpConfig('DELETE', ...args))

    static headers = () => new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.TOKEN),
      'dataType': 'json'
    });

    /**
     * @description
     * Get HTTP request config.
     *
     * @param  {String} method
     * @param  {String} path
     * @param  {Object} props
     * @return {Function<Object>}
     * @private
     */
    static httpConfig = (method, path, props) =>
      new Request(`${HOST}/api${path}`, {
        method,
        headers: Api.headers(),
        ...(
          props
            ? { body: JSON.stringify(props) }
            : {}
        )
      })

    /**
     * @description
     * Do a fetch HTTP request.
     *
     * @param  {Object} request
     * @return {Function<Object>}
     * @private
     */
    static httpRequest = request =>
      new Promise((resolve, reject) =>
        fetch(request)
          .then(res =>
            res.ok
              ? res.json().then(data => resolve(data))
              : reject(new Error(res.statusText))
          )
          .catch(() => resolve())
      )

}

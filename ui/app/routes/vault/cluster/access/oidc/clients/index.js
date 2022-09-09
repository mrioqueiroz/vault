import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class OidcClientsRoute extends Route {
  @service router;

  model() {
    return this.store.query('oidc/client', {}).catch((err) => {
      if (err.httpStatus === 404) {
        return [];
      } else {
        throw err;
      }
    });
  }

  afterModel(model) {
    if (model.length === 0) {
      this.router.transitionTo('vault.cluster.access.oidc');
    }
  }
}

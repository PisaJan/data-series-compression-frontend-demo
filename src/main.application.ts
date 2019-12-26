import 'uikit/dist/css/uikit.min.css';

import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import environment from './environment';

export function configure(aurelia: Aurelia) {
  UIkit.use(Icons);
  aurelia.use.standardConfiguration();
  aurelia.use.developmentLogging(environment.debug ? "debug" : "warn");
  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName("aurelia-testing"));
  }
  aurelia
    .start()
    .then(() =>
      aurelia.setRoot(PLATFORM.moduleName("modules/router/index/index.route"))
    );
}

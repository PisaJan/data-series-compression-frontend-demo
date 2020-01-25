import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject } from 'aurelia-framework';

import { EGlobalEvent } from 'common/events/global';

@autoinject()
export class RefreshButtonCustomElement {
  public constructor(private readonly eventAggregator: EventAggregator) {}

  protected refresh(): void {
    this.eventAggregator.publish(EGlobalEvent.REFRESH_DATASET);
  }
}

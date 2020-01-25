import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject } from 'aurelia-framework';

import { EGlobalEvent } from 'common/events/global';

import { EDataSet } from 'modules/data-set/data-set.enum';

import { Options } from './options.model';

@autoinject()
export class OptionsService {
  private readonly options: Options = new Options();

  public constructor(private readonly eventAggregator: EventAggregator) {}

  public get dataSet(): EDataSet {
    return this.options.getDataSet();
  }
  public get rounds(): number {
    return this.options.getRounds();
  }
  public get deviation(): number {
    return this.options.getDeviation();
  }

  public set dataSet(dataSet: EDataSet) {
    this.options.setDataSet(dataSet);
    this.eventAggregator.publish(EGlobalEvent.OPTIONS_CHANGED);
  }

  public set rounds(rounds: number) {
    if (rounds < 0) {
      rounds = 0;
    } else if (Number.isNaN(rounds)) {
      rounds = 0;
    }
    this.options.setRounds(rounds);
    this.eventAggregator.publish(EGlobalEvent.OPTIONS_CHANGED);
  }

  public set deviation(deviation: number) {
    if (deviation > 100) {
      deviation = 100;
    } else if (deviation < 0) {
      deviation = 0;
    } else if (Number.isNaN(deviation)) {
      deviation = 0;
    }
    this.options.setDeviation(deviation);
    this.eventAggregator.publish(EGlobalEvent.OPTIONS_CHANGED);
  }
}

import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject } from 'aurelia-framework';
import environment from 'environment';

import { EGlobalEvent } from 'common/events/global';
import { UnreachableCaseException } from 'common/exceptions/unreachable-case/unreachable-case.exception';

import { OptionsService } from './../router/index/section/options/options.service';
import { EDataSet } from './data-set.enum';
import { DataSet } from './data-set.model';

@autoinject()
export class DataSetService {
  private small: DataSet | null;
  private medium: DataSet | null;
  private large: DataSet | null;

  public constructor(
    private readonly options: OptionsService,
    private readonly eventAggregator: EventAggregator
  ) {
    this.eventAggregator.subscribe(
      EGlobalEvent.REFRESH_DATASET,
      this.refresh.bind(this)
    );
  }

  private refresh(): void {
    this.small = null;
    this.medium = null;
    this.large = null;
    this.eventAggregator.publish(EGlobalEvent.DATASET_CHANGED);
  }

  public get(): DataSet {
    switch (this.options.dataSet) {
      case EDataSet.SMALL:
        if (!this.small) {
          this.small = new DataSet(environment.dataSet.small.size);
        }
        return this.small;
      case EDataSet.MEDIUM:
        if (!this.medium) {
          this.medium = new DataSet(environment.dataSet.medium.size);
        }
        return this.medium;
      case EDataSet.LARGE:
        if (!this.medium) {
          this.large = new DataSet(environment.dataSet.small.size);
        }
        return this.large;
      default:
        throw new UnreachableCaseException(this.options.dataSet);
    }
  }
}

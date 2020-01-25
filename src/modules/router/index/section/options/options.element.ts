import { autoinject } from 'aurelia-framework';

import { EDataSet } from 'modules/data-set/data-set.enum';

import { OptionsService } from './options.service';

@autoinject()
export class OptionsCustomElement {
  protected readonly dataSets: Map<EDataSet, string> = new Map([
    [EDataSet.SMALL, "Small dataset"],
    [EDataSet.MEDIUM, "Medium dataset"],
    [EDataSet.LARGE, "Large dataset"]
  ]);
  public constructor(protected readonly options: OptionsService) {}
}

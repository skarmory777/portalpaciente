import { Component, OnInit } from '@angular/core';
import { LoadingHelper } from '../../helpers/loading.helper';

@Component({
  selector: 'loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.less']
})
export class LoadingOverlayComponent implements OnInit {

  constructor(public loadingHelper: LoadingHelper) {}

  ngOnInit(): void {
  }

}

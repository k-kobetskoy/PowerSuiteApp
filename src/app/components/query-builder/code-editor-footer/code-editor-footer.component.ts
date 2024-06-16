import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-code-editor-footer',
  templateUrl: './code-editor-footer.component.html',
  styleUrls: ['./code-editor-footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CodeEditorFooterComponent implements OnInit {

  @Output() onParse: EventEmitter<void> = new EventEmitter<void>();
  @Output() onValidate: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
}

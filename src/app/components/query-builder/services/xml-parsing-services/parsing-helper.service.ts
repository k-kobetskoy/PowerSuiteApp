import { Injectable } from '@angular/core';
import { EditorView } from 'codemirror';

@Injectable({ providedIn: 'root' })
export class ParsingHelperService {

  constructor() { }
  
  getNodeAsString(view: EditorView, from: number, to: number ): string {    
    return view.state.sliceDoc(from, to);
  }
}

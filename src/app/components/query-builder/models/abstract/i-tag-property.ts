import { BehaviorSubject, Observable, Subject } from "rxjs";

export interface ITagProperty<T> {
  typeIndicator: string;
  name: string;
  constructorValue$?: BehaviorSubject<T> ;
  parsedValue$: BehaviorSubject<string>;
  nodePropertyDisplay: string;
  tagPropertyErrorMessage: BehaviorSubject<string>;
  validateTagPropertyValue: () => Observable<boolean>;
  typeValidationPassed$: BehaviorSubject<boolean>;

  destroy$: Subject<void>;
  destroy(): void;
}

import { FormControl } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";

export interface IFormPropertyModel<TProperty, TForm> {
    storedInputValue$: BehaviorSubject<TForm>;
    formControl: FormControl<TForm>;
    valuesObservable$?: Observable<TProperty[]>;
    values?: TProperty[];
    previousValue$?: BehaviorSubject<string>;
    filteredValues$?: Observable<TProperty[]>;
    filterFunc?: (value: TProperty, filterValue: string) => boolean;
    handlePropertyChangeFunc?: (property: TProperty) => void;
  }
  
import { BehaviorSubject } from "rxjs";

export interface ITagProperty<T> {
  name: string;
  value$?: BehaviorSubject<T> 
}

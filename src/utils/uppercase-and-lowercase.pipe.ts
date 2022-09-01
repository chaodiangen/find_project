import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercaseAndLowercasePipe implements PipeTransform {
  transform(value: string) {
    return value.toLocaleLowerCase();
  }
}

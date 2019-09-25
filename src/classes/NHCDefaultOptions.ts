import { NHCDefaultOptions } from '../interfaces';
import { Headers } from 'form-data';

export class DefaultOptions implements NHCDefaultOptions {
    constructor(
        public headers: Headers = {}
    ) {
    }
}

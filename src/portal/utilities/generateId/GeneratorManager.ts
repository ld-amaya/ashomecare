import { inject, injectable } from "inversify";
import { IGenerateId } from "./IGenerateId";
import { GenerateIdSymbols } from "./GenerateIdSymbols";

@injectable()
export class GeneratorManager {
    
    constructor(
        @inject(GenerateIdSymbols.UniqId) private _generate: IGenerateId
    ) { }
    
    create(prefix: string) {
        return this._generate.create(prefix);
    }
}
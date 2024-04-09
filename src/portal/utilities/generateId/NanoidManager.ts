/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { customAlphabet } from "nanoid";
import { IGenerateId } from "./IGenerateId";
import { injectable } from "inversify";

@injectable()
export class NanoidManager implements IGenerateId {

    create(prefix: string): string {
        const nanoid = customAlphabet('1234567890abcdef', 10)
        const nanoidId = nanoid();
        return `${prefix}-${nanoidId}`
    }
    
}
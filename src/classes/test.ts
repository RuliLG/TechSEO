import { Result } from '../types/result'
import { ResultType } from '../enums/result-type'
import { Importance } from '../enums/importance'
import { HeadlessBrowser } from './headless-browser'

export abstract class Test {
    private name: string
    private description: string
    private url?: string = null
    protected browser?: HeadlessBrowser = null
    protected isValid: boolean = false

    protected constructor (name: string, description: string, url: string = null) {
        this.name = name
        this.description = description
        this.url = url
    }

    getName (): string {
        return this.name
    }

    getDescription (): string {
        return this.description
    }

    setBrowser (browser: HeadlessBrowser) {
        this.browser = browser
    }

    result (): Result {
        return {
            name: this.getName(),
            description: this.getDescription(),
            type: this.getType(),
            infoUrl: this.url,
            passed: this.isValid,
            importance: this.getImportance()
        }
    }

    abstract getType (): ResultType
    abstract getImportance (): Importance
    abstract test (): Promise<Result>
}
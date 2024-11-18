import { ReactElement } from 'react'
import sanitizeHtml from 'sanitize-html'

export interface IHTMLParser {
    parseData(htmlString: string): ReactElement | null
}

interface HTMLParserConfig {
    sanitize: boolean
    className: string
    allowedTags: string[]
}

// TODO: Check these default settings
export class HTMLParser implements IHTMLParser {
    private config: HTMLParserConfig

    constructor(config: Partial<HTMLParserConfig> = {}) {
        this.config = {
            sanitize: true,
            className: 'prose max-w-none',
            allowedTags: ['p', 'b', 'i', 'em', 'strong'],
            ...config
        }
    }

    parseData = (htmlString: string): ReactElement => {
        if (!HTMLParser.isValidHTML(htmlString)) {
            throw new Error('Invalid HTML content')
        }

        let finalHTML = htmlString
        if (this.config.sanitize) {
            finalHTML = HTMLParser.sanitizeHTML(htmlString, this.config.allowedTags)
        }

        return <div dangerouslySetInnerHTML={{ __html: htmlString }} className={this.config.className} />
    }

    static isValidHTML = (html: string): boolean => {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(html, 'text/html')
            // Check if parsing produced any errors
            const parserErrors = doc.getElementsByTagName('parsererror')
            if (parserErrors.length > 0) {
                return false
            }
            // Additional check: ensure content isn't empty
            const body = doc.body
            return body.textContent!.trim().length > 0
        } catch {
            return false
        }
    }

    static sanitizeHTML = (html: string, allowedTags: string[]): string => {
        return sanitizeHtml(html, {
            allowedTags: allowedTags,
            allowedAttributes: {}
        })
    }
}

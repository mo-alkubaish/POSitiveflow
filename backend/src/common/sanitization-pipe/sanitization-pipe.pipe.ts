import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // If value is not an object or is null, return as-is
    if (!value || typeof value !== 'object') {
      return value;
    }

    // Deep sanitization for objects and arrays
    return this.sanitizeDeep(value);
  }

  private sanitizeDeep(input: any): any {
    // Handle null or undefined
    if (input === null || input === undefined) {
      return input;
    }

    // Sanitize strings
    if (typeof input === 'string') {
      return this.sanitizeString(input);
    }

    // Handle arrays
    if (Array.isArray(input)) {
      return input.map(item => this.sanitizeDeep(item));
    }

    // Handle objects
    if (typeof input === 'object') {
      const sanitizedObj: any = {};
      for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
          sanitizedObj[key] = this.sanitizeDeep(input[key]);
        }
      }
      return sanitizedObj;
    }

    // Return other types as-is
    return input;
  }

  private sanitizeString(str: string): string {
    // Remove HTML tags, trim whitespace, and encode special characters
    return sanitizeHtml(str.trim(), {
      allowedTags: [], // Remove all HTML tags
      allowedAttributes: {}, // Remove all attributes
      textFilter: (text) => text.replace(/[&<>"'/]/g, (match) => {
        const entityMap: { [key: string]: string } = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
          '/': '&#x2F;'
        };
        return entityMap[match];
      })
    });
  }
}
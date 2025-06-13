import { lookup } from "mime-types";
import { 
    MimeType, 
    MimeBytes, 
    Charset, 
    CharsetBytes, 
    Encoding, 
    EncodingBytes, 
    Language, 
    LanguageBytes,
} from "./mimeEncoding";

import {    
    encodeMimeType, 
    encodeCharset, 
    encodeEncoding, 
    encodeLanguage, 
    decodeMimeType, 
    decodeCharset, 
    decodeEncoding, 
    decodeLanguage 
} from "./mimeEncoding";

export type MetadataProperty = 'mime' | 'charset' | 'encoding' | 'language';


export function encodeProperty(property: MetadataProperty, value: string) {
    if (property === 'mime') {
        return encodeMimeType(value as MimeType);
    } else if (property === 'charset') {
        return encodeCharset(value as Charset);
    } else if (property === 'encoding') {
        return encodeEncoding(value as Encoding);
    } else if (property === 'language') {
        return encodeLanguage(value as Language);
    }
}

export function decodeProperty(property: MetadataProperty, value: string) {
    if (property === 'mime') {
        return decodeMimeType(value as MimeBytes);
    } else if (property === 'charset') {
        return decodeCharset(value as CharsetBytes);
    } else if (property === 'encoding') {
        return decodeEncoding(value as EncodingBytes);
    } else if (property === 'language') {
        return decodeLanguage(value as LanguageBytes);
    }
}
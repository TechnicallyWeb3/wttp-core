import { lookup } from "mime-types";

export const mimeTypesToBytes = {
    'text/html': '0x7468', // th
    'text/javascript': '0x616a', // aj (defaults to application/javascript)
    'text/css': '0x7463', // tc 
    'text/markdown': '0x746d', // tm
    'text/plain': '0x7470', // tp
    'application/javascript': '0x616a', // aj
    'application/xml': '0x6178', // ax
    'application/pdf': '0x6170', // ap
    'application/json': '0x616f', // ao (object)
    'image/png': '0x6970', // ip
    'image/jpeg': '0x696a', // ij
    'image/gif': '0x6967', // ig
    'image/svg+xml': '0x6973', // is
    'image/webp': '0x6977', // iw
    'image/x-icon': '0x6969', // ii
    'font/ttf': '0x6674', // ft
    'font/otf': '0x666f', // fo
    'font/woff': '0x6677', // fw
    'font/woff2': '0x6632', // f2
    'application/octet-stream': '0x6273' // bs (binary stream)
}

export const bytesToMimeTypes = {
    '0x7468': 'text/html', // th
    '0x7463': 'text/css', // tc 
    '0x746d': 'text/markdown', // tm
    '0x7470': 'text/plain', // tp
    '0x616a': 'application/javascript', // aj
    '0x6178': 'application/xml', // ax
    '0x6170': 'application/pdf', // ap
    '0x616f': 'application/json', // ao (object)
    '0x6970': 'image/png', // ip
    '0x696a': 'image/jpeg', // ij
    '0x6967': 'image/gif', // ig
    '0x6973': 'image/svg+xml', // is
    '0x6977': 'image/webp', // iw
    '0x6969': 'image/x-icon', // ii
    '0x6674': 'font/ttf', // ft
    '0x666f': 'font/otf', // fo
    '0x6677': 'font/woff', // fw
    '0x6632': 'font/woff2', // f2
    '0x6273': 'application/octet-stream' // bs (binary stream)
}

export type MimeType = keyof typeof mimeTypesToBytes;
export type MimeBytes = keyof typeof bytesToMimeTypes;

// Helper function to convert MIME type to bytes2
export function encodeMimeType(mimeType: MimeType): MimeBytes {
    return (mimeTypesToBytes[mimeType] || '0x6273') as MimeBytes; // Default to binary stream
}

export function decodeMimeType(bytes: MimeBytes): MimeType {
    return (bytesToMimeTypes[bytes] || 'application/octet-stream') as MimeType; // Default to binary stream
}

export const charsetToBytes = {
    'utf-8': '0x7508', // u(8)
    'utf-16': '0x7510', // u(16)
    'utf-32': '0x7520', // u(32)
    'utf-16le': '0x106c', // (16)l
    'utf-16be': '0x1062', // (16)b
    'utf-32le': '0x206c', // (32)l
    'utf-32be': '0x2062', // (32)b
    'us-ascii': '0x7561', // ua
    'unicode': '0x7563', // uc
    'iso-8859-1': '0x6901', // i(1)
    'iso-8859-2': '0x6902', // i(2)
    'iso-8859-3': '0x6903', // i(3)
    'iso-8859-4': '0x6904', // i(4)
    'iso-8859-5': '0x6905', // i(5)
    'iso-8859-6': '0x6906', // i(6)
    'iso-8859-7': '0x6907', // i(7)
    'iso-8859-8': '0x6908', // i(8)
    'iso-8859-9': '0x6909', // i(9)
    'iso-8859-10': '0x690a', // i(10)
    'iso-8859-11': '0x690b', // i(11)
    'iso-8859-13': '0x690d', // i(13)
    'iso-8859-14': '0x690e', // i(14)
    'iso-8859-15': '0x690f', // i(15)
    'iso-8859-16': '0x6910', // i(16)
    'windows-1250': '0x7732', // w(50)
    'windows-1251': '0x7733', // w(51)
    'windows-1252': '0x7734', // w(52)
    'windows-1253': '0x7735', // w(53)
    'windows-1254': '0x7736', // w(54)
    'windows-1255': '0x7737', // w(55)
    'windows-1256': '0x7738', // w(56)
    'windows-1257': '0x7739', // w(57)
    'windows-1258': '0x773a', // w(58)
    'big5': '0x6205', // b(5)
    'shift_jis': '0x0000', // sj
    'euc-jp': '0x0000', // ej
    'euc-kr': '0x0000', // ek
    'gbk': '0x0000', // gk
    'gb18030': '0x0000', // g18030
    'gb2312': '0x0000', // g2312
    'gb2312-80': '0x0000', // g2312-80
    'gb2312-90': '0x0000', // g2312-90
    'gb2312-95': '0x0000', // g2312-95
    'gb2312-00': '0x0000', // g2312-00
}

export const bytesToCharset = {
    '0x7508': 'utf-8',
    '0x7510': 'utf-16',
    '0x7520': 'utf-32',
    '0x106c': 'utf-16le',
    '0x1062': 'utf-16be',
    '0x206c': 'utf-32le',
    '0x2062': 'utf-32be',
    '0x7561': 'us-ascii',
    '0x7563': 'unicode',
    '0x6901': 'iso-8859-1',
    '0x6902': 'iso-8859-2',
    '0x6903': 'iso-8859-3',
    '0x6904': 'iso-8859-4',
    '0x6905': 'iso-8859-5',
    '0x6906': 'iso-8859-6',
    '0x6907': 'iso-8859-7',
    '0x6908': 'iso-8859-8',
    '0x6909': 'iso-8859-9',
    '0x690a': 'iso-8859-10',
    '0x690b': 'iso-8859-11',
    '0x690d': 'iso-8859-13',
    '0x690e': 'iso-8859-14',
    '0x690f': 'iso-8859-15',
    '0x6910': 'iso-8859-16',
    '0x7732': 'windows-1250',
    '0x7733': 'windows-1251',
    '0x7734': 'windows-1252',
    '0x7735': 'windows-1253',
    '0x7736': 'windows-1254',
    '0x7737': 'windows-1255',
    '0x7738': 'windows-1256',
    '0x7739': 'windows-1257',
    '0x773a': 'windows-1258',
    '0x6205': 'big5',
}

export type Charset = keyof typeof charsetToBytes;
export type CharsetBytes = keyof typeof bytesToCharset;

export function encodeCharset(charset: Charset): CharsetBytes {
    return (charsetToBytes[charset] || '0x7508') as CharsetBytes; // Default to utf-8
}

export function decodeCharset(bytes: CharsetBytes): Charset {
    return (bytesToCharset[bytes] || 'utf-8') as Charset; // Default to utf-8
}

export const encodingToBytes = {
    'gzip': '0x677a', // gz
    'identity': '0x6964', // id
    'zstd': '0x7a73', // zs
    'zlib': '0x7a6c', // zl
    'brotli': '0x6272', // br
    'lz4': '0x6c34', // l4
    'snappy': '0x736e', // sn
    'lzma': '0x6c6d', // lm
}

export const bytesToEncoding = {
    '0x677a': 'gzip',
    '0x6964': 'identity',
    '0x7a73': 'zstd',
    '0x7a6c': 'zlib',
    '0x6272': 'brotli',
    '0x6c34': 'lz4',
    '0x736e': 'snappy',
    '0x6c6d': 'lzma',
}

export type Encoding = keyof typeof encodingToBytes;
export type EncodingBytes = keyof typeof bytesToEncoding;

export function encodeEncoding(encoding: Encoding): EncodingBytes {
    return (encodingToBytes[encoding] || '0x6964') as EncodingBytes; // Default to identity
}

export function decodeEncoding(bytes: EncodingBytes): Encoding {
    return (bytesToEncoding[bytes] || 'identity') as Encoding; // Default to identity
}

export const languageToBytes = {
    'en': '0x6500', // e
    'fr': '0x6600', // f
    'de': '0x6400', // d
    'es': '0x7300', // s
    'it': '0x6900', // i
    'ja': '0x6a00', // j
    'ko': '0x6b00', // k
    'ru': '0x7200', // r
}

export const bytesToLanguage = {
    '0x6500': 'en',
    '0x6600': 'fr',
    '0x6400': 'de',
    '0x7300': 'es',
    '0x6900': 'it',
    '0x6a00': 'ja',
    '0x6b00': 'ko',
    '0x7200': 'ru',
}

export type Language = keyof typeof languageToBytes;
export type LanguageBytes = keyof typeof bytesToLanguage;

export function encodeLanguage(language: Language): LanguageBytes {
    return (languageToBytes[language]) as LanguageBytes;
}

export function decodeLanguage(bytes: LanguageBytes): Language {
    return (bytesToLanguage[bytes]) as Language;
}


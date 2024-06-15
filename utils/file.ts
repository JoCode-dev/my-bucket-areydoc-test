/**
 * Convert a File object string to a Base64.
 * 
 * @param file - The File string to convert.
 * @return Promise - The Base64 converted
 */
export const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

/**
 * Convert a Base64 string to a File object.
 * 
 * @param base64 - The Base64 string to convert.
 * @param fileName - The name of the resulting file.
 * @param mimeType - The MIME type of the file (optional).
 * @returns A Promise that resolves to a File object.
 */
export async function base64ToFile(base64: string, fileName: string, mimeType: string = ''): Promise<File> {
    // Decode base64 string to binary data
    mimeType = mimeType || (base64.match(/^data:([^;]+);/) || '')[1];
    return (fetch(base64)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], fileName, { type: mimeType }); })
    );
}


type MimeTypes = {
    [key: string]: string[];
};

const mimeTypes: MimeTypes = {
    "Image": ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"],
    "Music": ["audio/mpeg", "audio/ogg", "audio/wav", "audio/aac"],
    "Video": ["video/mp4", "video/mpeg", "video/ogg", "video/webm", "video/x-msvideo"],
    "Doc": ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf", "text/plain", "text/html"],
    "Compressed": ["application/zip", "application/x-rar-compressed", "application/x-7z-compressed", "application/gzip"]
};

/**
 * Returns a string according to file type
 * 
 * @param mimeType 
 * @returns string - Possibles values "image", "music", "video", "doc"; "compressed"
 */
export function getFileType(mimeType: string): string | null {
    for (const [type, mimeArray] of Object.entries(mimeTypes)) {
        if (mimeArray.includes(mimeType)) {
            return type;
        }
    }
    return null;
}

/**
 * Converts a byte value into a human-readable string with appropriate units.
 *
 * @param bytes - The size in bytes to be converted.
 * @param decimals - The number of decimal places to display in the result. Default is 2.
 * @returns A string representing the size in appropriate units (Bytes, KiB, MiB, etc.).
 */

export function formatBytes(bytes: number | any, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

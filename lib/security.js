// lib/security.js

/**
 * 1. Sanitizes filenames to prevent XSS, Script Injection, and Path Traversal
 */
export function sanitizeFileName(fileName) {
  if (!fileName || typeof fileName !== 'string') return 'unnamed_file';
  
  return fileName
    .replace(/[^a-zA-Z0-9.\-_]/g, '_') // Replace illegal chars with underscore
    .replace(/\.\.+/g, '_')             // Block directory traversal (../)
    .trim();
}

/**
 * 2. Deep Hex Magic Bytes File Verification (Client-Side Buffer Inspection)
 */
export async function verifyFileMagicBytes(file) {
  return new Promise((resolve) => {
    if (!file || !(file instanceof File)) return resolve(false);

    const reader = new FileReader();
    reader.onloadend = function (e) {
      if (!e || !e.target || !e.target.result) {
        return resolve(false);
      }

      const arr = new Uint8Array(e.target.result).subarray(0, 8);
      let header = '';
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16).padStart(2, '0');
      }

      // True Binary Signatures
      const signatures = {
        jpg: header.startsWith('ffd8ff'),
        png: header.startsWith('89504e47'),
        webp: header.startsWith('52494646'), // RIFF
        pdf: header.startsWith('25504446'),  // %PDF
        zipBased: header.startsWith('504b0304') || header.startsWith('504b0506'), // PK.. (DOCX, PPTX)
      };

      const isValid = Object.values(signatures).some((status) => status === true);
      resolve(isValid);
    };

    reader.onerror = () => resolve(false);
    reader.readAsArrayBuffer(file.slice(0, 8));
  });
}

/**
 * 3. File Size & RAM Flooding Guard
 */
export function validateFileSize(file, maxMB = 100) {
  if (!file) return { valid: false, error: 'No file provided for analysis.' };
  
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > maxMB) {
    return {
      valid: false,
      error: `Security Alert: File size (${fileSizeMB.toFixed(1)}MB) exceeds maximum limit of ${maxMB}MB.`,
    };
  }

  return { valid: true, error: null };
}
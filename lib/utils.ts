import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TextSegment } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SEGMENT_WORD_LIMIT = 300;

interface ParsedPDF {
  content: TextSegment[];
  cover: string; // data URL of the first page rendered as an image
}

/**
 * Parses a PDF File using pdfjs-dist (runs in the browser).
 * Returns text segments split by ~300 words and a base64 cover image from page 1.
 */
export async function parsePDFFile(file: File): Promise<ParsedPDF> {
  // Dynamically import pdfjs so it only loads client-side
  const pdfjsLib = await import('pdfjs-dist');

  // Point the worker at the bundled worker file
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
  ).toString();

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const segments: TextSegment[] = [];
  let segmentIndex = 0;
  let pending = '';
  let pendingPage: number | undefined;

  const flush = () => {
    const trimmed = pending.trim();
    if (trimmed.length === 0) return;
    segments.push({
      text: trimmed,
      segmentIndex,
      pageNumber: pendingPage,
      wordCount: trimmed.split(/\s+/).length,
    });
    segmentIndex++;
    pending = '';
    pendingPage = undefined;
  };

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');

    const words = pageText.split(/\s+/);
    if (pendingPage === undefined) pendingPage = pageNum;

    for (const word of words) {
      pending += (pending ? ' ' : '') + word;
      if (pending.split(/\s+/).length >= SEGMENT_WORD_LIMIT) {
        flush();
        pendingPage = pageNum;
      }
    }
  }
  flush();

  // Render page 1 to a canvas to generate a cover image
  let cover = '';
  try {
    const firstPage = await pdf.getPage(1);
    const viewport = firstPage.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d')!;
    await firstPage.render({ canvasContext: ctx, viewport, canvas }).promise;
    cover = canvas.toDataURL('image/png');
  } catch {
    cover = '';
  }

  return { content: segments, cover };
}

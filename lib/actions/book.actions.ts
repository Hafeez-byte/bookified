'use server';

import { TextSegment } from '@/types';

interface CheckBookExistsResult {
    exists: boolean;
    book?: { slug: string };
}

interface CreateBookInput {
    clerkId: string;
    title: string;
    author: string;
    persona?: string;
    fileURL: string;
    fileBlobKey: string;
    coverURL?: string;
    coverBlobKey?: string;
    fileSize: number;
}

interface CreateBookResult {
    success: boolean;
    error?: string;
    isBillingError?: boolean;
    alreadyExists?: boolean;
    data?: { _id: string; slug: string };
}

interface SaveSegmentsResult {
    success: boolean;
    error?: string;
}

export async function checkBookExists(title: string): Promise<CheckBookExistsResult> {
    try {
        // TODO: Replace with real DB lookup (e.g. mongoose Book model)
        // const book = await Book.findOne({ title: { $regex: new RegExp(`^${title}$`, 'i') } });
        // if (book) return { exists: true, book: { slug: book.slug } };
        return { exists: false };
    } catch (error) {
        console.error('checkBookExists error:', error);
        return { exists: false };
    }
}

export async function createBook(input: CreateBookInput): Promise<CreateBookResult> {
    try {
        // TODO: Replace with real DB insertion (e.g. mongoose Book model)
        // const slug = input.title.toLowerCase().replace(/\s+/g, '-');
        // const book = await Book.create({ ...input, slug });
        // return { success: true, data: { _id: book._id.toString(), slug: book.slug } };

        const slug = input.title.toLowerCase().replace(/\s+/g, '-');
        return {
            success: true,
            data: { _id: 'placeholder-id', slug },
        };
    } catch (error) {
        console.error('createBook error:', error);
        return { success: false, error: String(error) };
    }
}

export async function saveBookSegments(
    bookId: string,
    clerkId: string,
    segments: TextSegment[]
): Promise<SaveSegmentsResult> {
    try {
        // TODO: Replace with real DB insertion (e.g. mongoose BookSegment model)
        // await BookSegment.insertMany(
        //     segments.map((seg) => ({ ...seg, bookId, clerkId }))
        // );
        console.log(`Saving ${segments.length} segments for book ${bookId}`);
        return { success: true };
    } catch (error) {
        console.error('saveBookSegments error:', error);
        return { success: false, error: String(error) };
    }
}

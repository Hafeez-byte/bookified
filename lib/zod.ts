import { z } from 'zod';
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, MAX_IMAGE_SIZE } from '@/lib/constants';

export const UploadSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(200, 'Title must be under 200 characters'),

    author: z
        .string()
        .min(1, 'Author is required')
        .max(100, 'Author name must be under 100 characters'),

    persona: z
        .string()
        .min(1, 'Please select a voice'),

    pdfFile: z
        .instanceof(File, { message: 'PDF file is required' })
        .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            `PDF must be smaller than 50MB`
        )
        .refine(
            (file) => ACCEPTED_PDF_TYPES.includes(file.type),
            'Only PDF files are accepted'
        ),

    coverImage: z
        .instanceof(File)
        .refine(
            (file) => file.size <= MAX_IMAGE_SIZE,
            'Image must be smaller than 10MB'
        )
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            'Only JPEG, PNG, or WebP images are accepted'
        )
        .optional(),
});

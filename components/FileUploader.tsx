'use client';

import React, { useCallback, useState } from 'react';
import { Controller, FieldValues, FieldPath, Control } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface FileUploaderProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    acceptTypes: string[];
    icon: LucideIcon;
    placeholder: string;
    hint: string;
    disabled?: boolean;
}

const FileUploader = <T extends FieldValues>({
    control,
    name,
    label,
    acceptTypes,
    icon: Icon,
    placeholder,
    hint,
    disabled,
}: FileUploaderProps<T>) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>, onChange: (file: File) => void) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file && acceptTypes.includes(file.type)) {
                onChange(file);
                setFileName(file.name);
                if (file.type.startsWith('image/')) {
                    setPreview(URL.createObjectURL(file));
                }
            }
        },
        [acceptTypes]
    );

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormItem>
                    <FormLabel className="form-label">{label}</FormLabel>

                    <div
                        className={`file-uploader ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, onChange)}
                        onClick={() => {
                            if (!disabled) {
                                document.getElementById(`file-input-${name}`)?.click();
                            }
                        }}
                    >
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="file-uploader-preview"
                            />
                        ) : (
                            <div className="file-uploader-content">
                                <Icon className="file-uploader-icon" />
                                <p className="file-uploader-placeholder">{placeholder}</p>
                                <p className="file-uploader-hint">{hint}</p>
                            </div>
                        )}

                        {fileName && (
                            <p className="file-uploader-filename">{fileName}</p>
                        )}

                        <input
                            id={`file-input-${name}`}
                            type="file"
                            accept={acceptTypes.join(',')}
                            className="hidden"
                            disabled={disabled}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    onChange(file);
                                    setFileName(file.name);
                                    if (file.type.startsWith('image/')) {
                                        setPreview(URL.createObjectURL(file));
                                    } else {
                                        setPreview(null);
                                    }
                                }
                            }}
                        />
                    </div>

                    {error && <FormMessage>{error.message}</FormMessage>}
                </FormItem>
            )}
        />
    );
};

export default FileUploader;

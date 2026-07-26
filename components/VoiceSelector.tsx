'use client';

import React from 'react';
import { voiceOptions, voiceCategories } from '@/lib/constants';
import { VoiceSelectorProps } from '@/types';

const VoiceSelector = ({ value, onChange, disabled, className }: VoiceSelectorProps) => {
    return (
        <div className={`voice-selector ${className ?? ''}`}>
            {Object.entries(voiceCategories).map(([category, keys]) => (
                <div key={category} className="voice-category">
                    <p className="voice-category-label">{category.charAt(0).toUpperCase() + category.slice(1)} Voices</p>
                    <div className="voice-options">
                        {keys.map((key) => {
                            const voice = voiceOptions[key as keyof typeof voiceOptions];
                            const isSelected = value === key;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => onChange(key)}
                                    className={`voice-option ${isSelected ? 'voice-option--selected' : ''}`}
                                >
                                    <span className="voice-option-name">{voice.name}</span>
                                    <span className="voice-option-desc">{voice.description}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VoiceSelector;

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import {sampleBooks} from "@/lib/constants";
import BookCard from "@/components/BookCard";

interface HeroSectionProps {
  onAddNewBook?: () => void;
}

const steps = [
  {
    number: 1,
    title: 'Upload PDF',
    description: 'Add your book file',
  },
  {
    number: 2,
    title: 'AI Processing',
    description: 'We analyze the content',
  },
  {
    number: 3,
    title: 'Voice Chat',
    description: 'Discuss with AI',
  },
];



const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="wrapper mb-10 md:mb-16">
      <div className="bg-[#f3e4c7] rounded-[24px] p-6 sm:p-8 lg:px-12 lg:py-8 relative overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6">
          {/* Left Column: Heading, Description, Add New Book Button */}
          <div className="lg:col-span-4 flex flex-col items-start justify-center text-left space-y-4 sm:space-y-5 z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1f2937] font-serif leading-[1.15] tracking-tight">
              Your Library
            </h1>

            <p className="text-base sm:text-lg text-[#3d485e] leading-relaxed max-w-md font-sans">
              Convert your books into interactive AI conversations.
              <br className="hidden sm:inline" />
              Listen, learn, and discuss your favorite reads.
            </p>

            <div className="pt-2">
              <Link
                href="/books/new"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#1f2937] font-serif font-bold text-base sm:text-lg rounded-[14px] shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                <Plus className="w-5 h-5 stroke-[2.5] text-[#1f2937]" />
                <span>Add new book</span>
              </Link>
            </div>
          </div>

          {/* Center Column: Vintage Books & Globe Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center py-2 lg:py-0">
            <div className="relative w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[340px] flex justify-center items-center">
              <Image
                src="/assets/Gemini_Generated_Image_jlix6fjlix6fjlix (1) 1.png"
                alt="Vintage books and globe illustration"
                width={460}
                height={320}
                priority
                className="w-full h-auto object-contain drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Right Column: 3-Step Process Card */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <div className="bg-white rounded-[20px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/5 w-full max-w-[320px] lg:w-[290px] shrink-0">
              <div className="flex flex-col gap-6">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center font-serif text-sm font-semibold text-gray-800 shrink-0 mt-0.5 transition-colors group-hover:border-gray-900 group-hover:bg-gray-50">
                      {step.number}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-serif font-bold text-base text-[#1f2937] leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#6b7280] font-sans mt-0.5 leading-tight">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;

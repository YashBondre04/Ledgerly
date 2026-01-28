"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function TeamViewAccordion() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="py-12 md:py-16 bg-[#F9FAFC]">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {/* Accordion Header - Always Visible */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setIsOpen(!isOpen);
                            }
                        }}
                        className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-inset"
                        aria-expanded={isOpen}
                        aria-controls="team-view-content"
                    >
                        <div className="flex-1 text-left">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                                Advanced team visibility
                            </h3>
                            <p className="text-sm text-gray-500">
                                For growing teams that need deeper control and clarity
                            </p>
                        </div>
                        <ChevronDown
                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </button>

                    {/* Accordion Content - Expandable */}
                    <div
                        id="team-view-content"
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        aria-hidden={!isOpen}
                    >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 border-t border-gray-100">
                            {/* Content Grid - Text Left, Image Right */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center pt-6">
                                {/* Left Side - Text Content */}
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-2 shrink-0" />
                                            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                                <span className="font-semibold text-gray-900">Subscriptions organized by teams and sub-teams</span>
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-2 shrink-0" />
                                            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                                <span className="font-semibold text-gray-900">Role-based access</span> (admins, managers, members)
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-2 shrink-0" />
                                            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                                <span className="font-semibold text-gray-900">Team-level analytics</span> for spend and usage
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-2 shrink-0" />
                                            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                                <span className="font-semibold text-gray-900">Timely renewal and expiry notifications</span> via email and WhatsApp
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Infographic Image */}
                                <div className="order-first lg:order-last">
                                    <div className="relative bg-linear-to-br from-gray-50 to-gray-100/50 rounded-lg border border-gray-200 overflow-hidden">
                                        <Image
                                            src="/hierarchical-team-view.jpg"
                                            alt="Hierarchical team view showing organization structure with roles and permissions"
                                            width={600}
                                            height={800}
                                            className="w-full h-auto"
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

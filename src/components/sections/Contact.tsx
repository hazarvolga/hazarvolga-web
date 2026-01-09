"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Updated validation schema
const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
    const { t } = useLanguage();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        // Determine subject based on message content or a default
        // We'll just stick to a generic subject or user input if field existed
        console.log(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        reset();
        alert("Message sent successfully!");
    };

    return (
        <section id="contact" className="py-32 bg-black relative z-20 min-h-screen flex items-center">
            <div className="container-wide w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

                    {/* Info Side */}
                    <div>
                        <h2 className="font-display text-6xl md:text-8xl font-bold text-white uppercase leading-[0.8] mb-12">
                            {t.contact.title} <br /> <span className="text-accent stroke-text">{t.contact.titleAccent}</span>
                        </h2>

                        <div className="space-y-8 font-sans text-gray-400">
                            <p className="text-xl max-w-md">
                                {t.contact.desc}
                            </p>
                            <a href="mailto:info@hazarvolga.com.tr" className="font-display text-2xl text-white hover:text-accent transition-colors inline-flex items-center gap-2 group">
                                info@hazarvolga.com.tr
                                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>

                        <div className="mt-24 grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-mono text-xs text-accent uppercase mb-4">{t.contact.locationTitle}</h4>
                                <p className="text-white">{t.contact.location}</p>
                            </div>
                            <div>
                                <h4 className="font-mono text-xs text-accent uppercase mb-4">{t.contact.socialsTitle}</h4>
                                <div className="flex flex-col gap-2">
                                    <a href={SITE_CONFIG.links.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">GitHub</a>
                                    <a href={SITE_CONFIG.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">LinkedIn</a>
                                    <a href={SITE_CONFIG.links.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Instagram</a>
                                    <a href={SITE_CONFIG.links.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Facebook</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side with Brutalist Aesthetic */}
                    <div className="bg-surface p-8 md:p-12 border border-white/5 relative">
                        <div className="absolute top-0 right-0 p-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-4">
                            <div className="space-y-4">
                                <label htmlFor="name" className="block font-mono text-xs uppercase text-gray-500">
                                    {t.contact.form.nameLabel}
                                </label>
                                <input
                                    {...register("name")}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-white text-xl focus:border-accent focus:outline-none transition-colors rounded-none placeholder:text-gray-700 font-sans"
                                    placeholder={t.contact.form.namePlaceholder}
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-xs font-mono">{errors.name.message}</span>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label htmlFor="email" className="block font-mono text-xs uppercase text-gray-500">
                                    {t.contact.form.emailLabel}
                                </label>
                                <input
                                    {...register("email")}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-white text-xl focus:border-accent focus:outline-none transition-colors rounded-none placeholder:text-gray-700 font-sans"
                                    placeholder={t.contact.form.emailPlaceholder}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-xs font-mono">{errors.email.message}</span>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label htmlFor="message" className="block font-mono text-xs uppercase text-gray-500">
                                    {t.contact.form.messageLabel}
                                </label>
                                <textarea
                                    {...register("message")}
                                    rows={4}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-white text-xl focus:border-accent focus:outline-none transition-colors rounded-none placeholder:text-gray-700 font-sans resize-none"
                                    placeholder={t.contact.form.messagePlaceholder}
                                />
                                {errors.message && (
                                    <span className="text-red-500 text-xs font-mono">{errors.message.message}</span>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-black font-display font-bold uppercase text-lg py-6 hover:bg-accent transition-colors disabled:opacity-50 mt-8"
                            >
                                {isSubmitting ? t.contact.form.sending : t.contact.form.submitButton}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

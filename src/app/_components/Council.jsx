'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchSiteContent } from '@/lib/utils';
import siteContent from '@/app/data/siteContent';

// Optimized blur data URL for image placeholders
const BLUR_DATA_URL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmMWYxZjEiLz48L3N2Zz4=";

// Animation variants
const animations = {
    title: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    },
    card: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        }
    }
};

// Swiper configuration
const SWIPER_CONFIG = {
    modules: [Autoplay, EffectCoverflow],
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
        rotate: 10,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 26 },
        480: { slidesPerView: 1.5, spaceBetween: 12 },
        640: { slidesPerView: 2, spaceBetween: 16 },
        768: { slidesPerView: 2.5, spaceBetween: 20 },
        1024: { slidesPerView: 3.5, spaceBetween: 24 },
        1280: { slidesPerView: 4, spaceBetween: 24 }
    }
};

// LinkedIn button component
const LinkedInButton = memo(({ url, name }) => {
    if (!url) return null;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-blue-500 hover:text-blue-700 transition-colors"
            aria-label={`LinkedIn profile of ${name}`}
        >
            <Linkedin className="w-5 h-5" />
        </a>
    );
});

LinkedInButton.displayName = 'LinkedInButton';

// MemberCard component
const MemberCard = memo(({ member, index }) => {
    const isPriority = index < 2;

    return (
        <motion.div
            variants={animations.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="h-full"
        >
            <Card className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-200 p-0 h-full flex flex-col">
                <div className="relative w-full" style={{ paddingTop: '133.33%' }}>
                    <Image
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        className="object-cover"
                        fill
                        sizes="(max-width: 480px) 90vw, (max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 25vw, 20vw"
                        loading={isPriority ? "eager" : "lazy"}
                        priority={isPriority}
                        quality={75}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                    />
                </div>
                <CardContent className="p-4 text-center flex-grow flex flex-col justify-between">
                    <div>
                        <h2 className="text-base sm:text-lg font-bold truncate mb-1">
                            {member.name}
                        </h2>
                        <p className="text-sm sm:text-md text-gray-600 mb-2">
                            {member.role}
                        </p>
                    </div>
                    <div className="mt-2">
                        <LinkedInButton url={member.linkedin} name={member.name} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
});

MemberCard.displayName = 'MemberCard';

// Loading skeleton
const CouncilSkeleton = () => {
    return (
        <section id="council" className="w-full">
            <div className="w-full px-0">
                <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-4 text-center mb-6 sm:mb-8 md:mb-12 px-3 sm:px-4 md:px-6">
                    <Skeleton className="h-12 sm:h-16 md:h-20 lg:h-24 w-64 sm:w-80 md:w-96 mx-auto" />
                    <Skeleton className="h-4 sm:h-5 md:h-6 w-full max-w-[600px] md:max-w-[700px] mx-auto" />
                </div>

                <div className="w-full overflow-x-hidden">
                    <div
                        className="skeleton-swiper"
                        style={{
                            padding: '10px 10px 20px',
                            width: '100vw',
                            marginLeft: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        {/* Mobile view - single card */}
                        <div className="sm:hidden flex justify-center">
                            <div style={{ width: 'calc(100% - 26px)', maxWidth: '300px' }} className="px-1 py-2">
                                <Card className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-200 p-0 h-full flex flex-col">
                                    <div className="relative w-full" style={{ paddingTop: '133.33%' }}>
                                        <Skeleton className="absolute inset-0 w-full h-full" />
                                    </div>
                                    <CardContent className="p-4 text-center flex-grow flex flex-col justify-between">
                                        <div>
                                            <Skeleton className="h-6 w-3/4 mx-auto mb-1" />
                                            <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
                                        </div>
                                        <div className="mt-2 flex justify-center">
                                            <Skeleton className="h-5 w-5 rounded-full" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Tablet and desktop view */}
                        <div className="hidden sm:flex justify-center items-center space-x-3 sm:space-x-4 md:space-x-5">
                            {/* Responsive card sizes based on breakpoints */}
                            {Array.from({ length: 5 }).map((_, index) => {
                                // Scale based on position
                                const isCenter = index === 2;
                                const isNearCenter = index === 1 || index === 3;

                                const scaleFactor = isCenter ? 1 : (isNearCenter ? 0.95 : 0.9);
                                const opacity = isCenter ? 1 : (isNearCenter ? 0.9 : 0.8);

                                return (
                                    <div
                                        key={index}
                                        className="w-64 sm:w-[calc(100%/1.5-12px)] md:w-[calc(100%/2-16px)] lg:w-[calc(100%/2.5-20px)] xl:w-[calc(100%/3.5-24px)] 2xl:w-[calc(100%/4-24px)]"
                                        style={{
                                            transform: `scale(${scaleFactor})`,
                                            opacity,
                                            transition: 'all 0.3s ease',
                                            zIndex: isCenter ? 10 : isNearCenter ? 5 : 1,
                                            minWidth: '260px',
                                            maxWidth: '300px',
                                        }}
                                    >
                                        <div className="px-1 py-2 h-full">
                                            <Card className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-200 p-0 h-full flex flex-col">
                                                <div className="relative w-full" style={{ paddingTop: '133.33%' }}>
                                                    <Skeleton className="absolute inset-0 w-full h-full" />
                                                </div>
                                                <CardContent className="p-4 text-center flex-grow flex flex-col justify-between">
                                                    <div>
                                                        <Skeleton className="h-6 w-3/4 mx-auto mb-1" />
                                                        <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
                                                    </div>
                                                    <div className="mt-2 flex justify-center">
                                                        <Skeleton className="h-5 w-5 rounded-full" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Council = () => {
    const [mounted, setMounted] = useState(false);
    const [councilData, setCouncilData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [usingFallback, setUsingFallback] = useState(false);

    useEffect(() => {
        setMounted(true);

        const loadContent = async () => {
            try {
                // Try to fetch content from API
                const content = await fetchSiteContent();
                if (content?.council) {
                    setCouncilData(content.council);
                } else {
                    // Fall back to static content if API fails or returns empty data
                    setCouncilData(siteContent.council);
                    setUsingFallback(true);
                }
            } catch (err) {
                console.error('Error loading council data:', err);
                // Fall back to static content on error
                setCouncilData(siteContent.council);
                setUsingFallback(true);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, []);

    if (loading) return <CouncilSkeleton />;
    if (!councilData || !councilData.members?.length) return null;

    const { title, description, members } = councilData;

    return (
        <section id="council" className="w-full">
            <div className="w-full px-0">
                <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-4 text-center mb-6 sm:mb-8 md:mb-12 px-3 sm:px-4 md:px-6">
                    <motion.h2
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
                        variants={animations.title}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        className="max-w-full sm:max-w-[600px] md:max-w-[700px] text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400"
                        variants={animations.title}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {description}
                    </motion.p>
                    {usingFallback && (
                        <div className="text-amber-600 text-sm mt-2 text-center">
                            Using local fallback content due to connection issues. Please refresh to try again.
                        </div>
                    )}
                </div>

                {mounted && (
                    <div className="w-full overflow-x-hidden">
                        <Swiper
                            {...SWIPER_CONFIG}
                            className="w-full"
                            style={{
                                padding: '10px 10px 20px',
                                width: '100vw',
                                marginLeft: '50%',
                                transform: 'translateX(-50%)'
                            }}
                        >
                            {members.map((member, index) => (
                                <SwiperSlide key={`${member.name}-${index}`} className="h-auto" style={{ width: 'auto' }}>
                                    <div className="px-1 py-2 h-full">
                                        <MemberCard member={member} index={index} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Council;
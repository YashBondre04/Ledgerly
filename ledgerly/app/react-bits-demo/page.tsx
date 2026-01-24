import BlurText from "@/components/react-bits/BlurText";
import LightRays from "@/components/react-bits/LightRays";
import ClientOnly from "@/components/ClientOnly";

export default function ReactBitsDemo() {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden font-sans">
            <div className="relative h-screen w-full flex flex-col items-center justify-center p-8">
                <ClientOnly>
                    <LightRays
                        raysColor="#4ff0b7"
                        raysSpeed={2.0}
                        lightSpread={0.2}
                        className="opacity-50"
                    />
                </ClientOnly>
                <h1 className="text-4xl md:text-6xl font-bold mb-8 z-10 text-center">
                    <BlurText
                        text="React Bits Demo: Light Rays & Blur Text"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-white"
                    />
                </h1>
                <p className="z-10 text-gray-300 max-w-md text-center">
                    This demo showcases the Light Rays background effect combined with the BlurText animation component.
                </p>
            </div>
        </div>
    );
}

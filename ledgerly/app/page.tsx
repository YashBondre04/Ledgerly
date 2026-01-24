'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    FileText,
    Users,
    TrendingUp,
    Link as LinkIcon,
    Search,
    BarChart3,
    ArrowRight,
    CheckCircle2,
    Zap,
    Eye,
    AlertCircle,
    GitBranch,
    Building2,
    Bell,
    Shield
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LightRays from "@/components/react-bits/LightRays";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Logo - Top Left */}
            <div className="fixed top-4 left-4 z-50">
                <Image
                    src="/logo-horizontal-light.svg"
                    alt="Ledgerly"
                    width={120}
                    height={32}
                    className="h-8 w-auto"
                />
            </div>

            {/* Navbar - Top Right with Glassmorphism */}
            <header className="fixed top-4 right-4 z-50">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-[15px] py-2 flex items-center gap-4 shadow-lg shadow-black/5">
                    <Button variant="ghost" className="text-[#6ee7b7] hover:text-[#6ee7b7]/80 hover:bg-white/10 font-medium">
                        Sign in
                    </Button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#060010] overflow-hidden">
                {/* Light Rays Effect */}
                <div className="absolute inset-0">
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#6ee7b7"
                        raysSpeed={1}
                        lightSpread={0.5}
                        rayLength={3}
                        pulsating={false}
                        fadeDistance={1}
                        saturation={1}
                        followMouse
                        mouseInfluence={0.1}
                        noiseAmount={0}
                        distortion={0}
                    />
                </div>

                <div className="container mx-auto px-4 text-center text-white relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
                        Track every subscription and recurring cost you’re paying for
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        Ledgerly gives founders a single, clear view of all SaaS subscriptions, owners, and monthly spend — without spreadsheets or finance headaches.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button className="bg-blue-700 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-full">
                            Join early access
                        </Button>
                        <Button variant="link" className="text-green-400 hover:text-green-300 gap-2 text-lg">
                            See how it works <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Gradient Transition */}
            <div className="h-24 bg-linear-to-b from-[#020817] to-white" />

            {/* Problem Section */}
            <section className="py-20 bg-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        The problem every growing team faces
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16">
                        SaaS spending gets messy fast — and it costs more than you think.
                    </p>

                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {/* Item 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                                <FileText className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Forgotten subscriptions</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Team members sign up for tools that quietly drain your budget month after month.
                            </p>
                        </div>
                        {/* Item 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                                <Users className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">No clear ownership</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                You're paying for tools but no one knows who signed up or why you still need them.
                            </p>
                        </div>
                        {/* Item 3 */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                                <TrendingUp className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Unpredictable spending</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                SaaS costs creep up silently, making it impossible to forecast or control expenses.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Solution Section */}
            <section className="py-20 bg-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        From chaos to clarity in minutes
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16">
                        Ledgerly works quietly in the background so you always know what you're spending.
                    </p>

                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {/* Item 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-100/50 rounded-full flex items-center justify-center mb-6 text-blue-900">
                                <LinkIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold mb-3">Connect your workspace</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Link your billing source or workspace in seconds. No complex setup required.
                            </p>
                        </div>
                        {/* Item 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-100/50 rounded-full flex items-center justify-center mb-6 text-blue-900">
                                <Search className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold mb-3">Automatic discovery</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Ledgerly finds all SaaS tools, subscriptions, and who owns them across your team.
                            </p>
                        </div>
                        {/* Item 3 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-100/50 rounded-full flex items-center justify-center mb-6 text-blue-900">
                                <BarChart3 className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold mb-3">Track and control</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Get a clear, live view of spending and accountability — all in one place.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard Preview Section */}
            <section className="py-20 bg-gray-50/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Everything in one place
                    </h2>
                    <p className="text-gray-500 mb-12">
                        See all your subscriptions, owners, and spend in a single, clean dashboard.
                    </p>

                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                        {/* Mock Dashboard Header */}
                        <div className="flex justify-between px-8 py-6 border-b border-gray-100">
                            <div className="text-left">
                                <div className="text-sm text-gray-400">Total Spend</div>
                                <div className="text-2xl font-bold text-blue-900">$2,847</div>
                            </div>
                            <div className="text-left">
                                <div className="text-sm text-gray-400">Active</div>
                                <div className="text-2xl font-bold text-gray-900">24</div>
                            </div>
                            <div className="text-left">
                                <div className="text-sm text-gray-400">Unused</div>
                                <div className="text-2xl font-bold text-gray-900">3</div>
                            </div>
                            <div className="text-left">
                                <div className="text-sm text-gray-400">Savings</div>
                                <div className="text-2xl font-bold text-gray-900">$420</div>
                            </div>
                        </div>

                        {/* Mock Dashboard Table */}
                        <div className="w-full">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-xs text-gray-400 border-b border-gray-50">
                                        <th className="px-8 py-4 font-normal">Name</th>
                                        <th className="px-4 py-4 font-normal">Owner</th>
                                        <th className="px-4 py-4 font-normal">Category</th>
                                        <th className="px-8 py-4 font-normal text-right">Cost/mo</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[
                                        { name: 'Slack', owner: 'Sarah Chen', cat: 'Communication', cost: '$840' },
                                        { name: 'GitHub', owner: 'Dev Team', cat: 'Development', cost: '$590' },
                                        { name: 'Figma', owner: 'Design Team', cat: 'Design', cost: '$450' },
                                        { name: 'Vercel', owner: 'Engineering', cat: 'Infrastructure', cost: '$320' },
                                        { name: 'Linear', owner: 'Product', cat: 'Project Mgmt', cost: '$200' },
                                        { name: 'Notion', owner: 'Everyone', cat: 'Documentation', cost: '$200' },
                                    ].map((item, i) => (
                                        <tr key={item.name} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                            <td className="px-8 py-4 font-medium text-gray-900">{item.name}</td>
                                            <td className="px-4 py-4 text-gray-500">{item.owner}</td>
                                            <td className="px-4 py-4 text-gray-500">{item.cat}</td>
                                            <td className="px-8 py-4 text-gray-900 font-medium text-right">{item.cost}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* How Ledgerly is Evolving Section */}
            <section className="py-20 bg-gray-50 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        How Ledgerly is evolving
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16">
                        We're building Ledgerly step by step, guided by real founder feedback.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* On Release Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-8 text-left shadow-sm hover:shadow-md transition-shadow h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                                    <CheckCircle2 className="text-white w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">On Release</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Zap className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm font-semibold text-gray-700">Quick setup</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FileText className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm text-gray-700">
                                        <strong className="font-semibold">Manual subscription</strong>
                                        <br />
                                        <span className="text-gray-500">tracking</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Bell className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm text-gray-700">
                                        <strong className="font-semibold">Timely Notification alerts</strong>
                                        <br />
                                        <span className="text-gray-500">(gmail/whatsapp)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Future Plans Card */}
                        <div className="bg-white border border-blue-200 rounded-xl p-8 text-left shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16"></div>
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                                    <Zap className="text-white w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Future Plans</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <BarChart3 className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm font-semibold text-gray-700">Advanced Team level analytics dashboard</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm font-semibold text-gray-700">Team level admin access to specific roles</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Search className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm font-semibold text-gray-700">Easy browse popular subscriptions/saas</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* CTA Section */}
            <section className="py-32 bg-white text-center">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Be the first to get updates on our development process.
                    </h2>
                    <p className="text-gray-500 mb-10 text-sm leading-relaxed">
                        We're a group of 2 college students working on Ledgerly. Get early access, product updates, and the chance to shape what we build.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <Input
                            type="email"
                            placeholder="you@company.com"
                            className="bg-white border-gray-200 h-12"
                        />
                        <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white h-12 px-6 whitespace-nowrap">
                            Get early access
                        </Button>
                    </form>
                    <p className="text-xs text-gray-600 mt-4">We will mail you a survey with few questions on submitting. Please do answer them to help us!</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0f172a] text-gray-400 py-12 border-t border-gray-800">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#6EE7B7] text-[#020817] p-1 rounded w-6 h-6 flex items-center justify-center">
                            <span className="font-bold text-xs">L</span>
                        </div>
                        <span className="text-white font-semibold">Ledgerly</span>
                    </div>

                    <div className="flex gap-8 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>

                    <div className="text-xs text-gray-600">
                        © 2026 Ledgerly
                    </div>
                </div>
            </footer>
        </div>
    );
}
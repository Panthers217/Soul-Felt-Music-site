// src/components/Contact.js
import React from 'react';

const Contact = () => {
  
function ContactMobile() {
    return (
        <div
            data-layer="Contact Mobile Responsive"
            className="w-full max-w-[425px] min-w-[320px] bg-black flex flex-col items-start overflow-hidden mx-auto"
        >
            <div className="w-full bg-white flex flex-col items-start overflow-hidden pr-0 sm:pr-0">
                <div className="w-full py-3 bg-[#1a1b22] flex flex-col items-center">
                    <div className="w-full h-[1px] bg-[#6e5049]/20" />
                    <div className="w-full max-w-[368px] pb-0.5 bg-[#21212b] flex flex-col items-start">
                        <div className="w-full relative">
                            <div className="relative left-0 top-0 w-full max-w-[368px] h-auto flex flex-col justify-center items-start gap-4 pr-4 pb-1">
                                <div className="text-white text-nowrap text-5xl sm:text-6xl font-bold font-['Roboto'] leading-tight">Contact Us</div>
                                <div className="w-full max-w-[350px] text-white/80 text-base font-normal font-['Roboto'] leading-6">Get in touch with the Soul Felt Music team. We're here to help with any questions about our artists, music, or community.</div>
                            </div>
                        </div>
                        <div className="relative left-0  w-full flex flex-col gap-12">
                            <div className="w-full px-6 pt-6 pb-7 bg-[#1d1e26] rounded-lg shadow-md flex flex-col gap-7">
                                <div className="w-full pb-1 border border-white/10 rounded flex justify-center gap-4">
                                    <div className="px-5 pt-1 pb-5 border border-[#aa2a46] rounded flex flex-col items-start">
                                        <div className="w-14 text-center text-[#aa2a46] text-sm font-medium font-['Public_Sans'] leading-snug">General Inquiry</div>
                                    </div>
                                    <div className="pl-3 pr-3 pt-1 pb-5 border border-transparent rounded flex flex-col items-start">
                                        <div className="w-20 text-center text-white/60 text-sm font-medium font-['Public_Sans'] leading-snug">Artist Submissions</div>
                                    </div>
                                    <div className="pl-4 pr-4 pt-1 pb-5 border border-transparent rounded flex flex-col items-start">
                                        <div className="w-12 text-center text-white/60 text-sm font-medium font-['Public_Sans'] leading-snug">Press & Media</div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-6">
                                    <div className="w-full flex flex-col gap-4">
                                        <div className="w-full max-w-[310px] h-16 relative">
                                            <div className="absolute left-0 top-6 w-full h-11 bg-[#060200] rounded-md border border-white/10" />
                                            <div className="absolute left-4 top-9 text-black text-sm font-normal font-['Public_Sans'] leading-tight">Enter your full name</div>
                                            <div className="absolute left-0 top-0 text-[#fffced] text-xs font-medium font-['Public_Sans'] leading-5">Full Name *</div>
                                        </div>
                                        <div className="w-full max-w-[310px] h-16 relative">
                                            <div className="absolute left-0 top-6 w-full h-11 bg-[#060200] rounded-md border border-white/10" />
                                            <div className="absolute left-4 top-9 text-black text-sm font-normal font-['Public_Sans'] leading-tight">Enter your email</div>
                                            <div className="absolute left-0 top-0 text-[#fffced] text-xs font-medium font-['Public_Sans'] leading-5">Email Address *</div>
                                        </div>
                                    </div>
                                    <div className="w-full max-w-[310px] h-16 relative">
                                        <div className="absolute left-0 top-6 w-full h-11 bg-[#060200] rounded-md border border-white/10" />
                                        <div className="absolute left-4 top-9 text-black text-sm font-normal font-['Public_Sans'] leading-tight">What's this about?</div>
                                        <div className="absolute left-0 top-0 text-[#fffced] text-xs font-medium font-['Public_Sans'] leading-5">Subject *</div>
                                    </div>
                                    <div className="w-full flex flex-col gap-2 pb-2">
                                        <div className="text-[#fffced] text-xs font-medium font-['Public_Sans'] leading-5">Message *</div>
                                        <div className="w-full max-w-[310px] h-36 bg-[#060200] rounded-md border border-white/10" />
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <div className="w-1/2 py-3 bg-[#aa2a46] rounded-md flex flex-col items-center">
                                            <div className="text-center text-[#fffced] text-sm font-medium font-['Public_Sans'] leading-snug">Send Message</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-7 pt-0.5">
                                <div className="w-full px-5 pt-5 pb-5 bg-[#1d1e26] rounded-lg shadow-md flex flex-col gap-5">
                                    <div className="text-[#fffced] text-lg font-medium font-['Roboto'] leading-7">Get In Touch</div>
                                    <div className="w-full flex flex-col gap-5">
                                        <div className="w-full flex gap-4 items-start">
                                            <div className="p-2 bg-[#aa2a46] rounded-full flex items-center justify-center">
                                                <div className="w-4 h-3 outline outline-2 outline-[#fffced]" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="text-[#fffced] text-sm font-medium font-['Public_Sans'] leading-snug">Email</div>
                                                <div className="text-white/70 text-xs font-normal font-['Public_Sans'] leading-5">hello@soulfeltmusic.com</div>
                                                <div className="text-white/70 text-xs font-normal font-['Public_Sans'] leading-5">press@soulfeltmusic.com</div>
                                            </div>
                                        </div>
                                        <div className="w-full flex gap-4 items-start">
                                            <div className="p-2 bg-[#aa2a46] rounded-full flex items-center justify-center">
                                                <div className="w-4 h-4 outline outline-2 outline-[#fffced]" />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <div className="text-[#fffced] text-sm font-medium font-['Public_Sans'] leading-snug">Phone</div>
                                                <div className="text-white/70 text-xs font-normal font-['Public_Sans'] leading-5">+1 (555) 123-4567</div>
                                                <div className="text-white/50 text-[0.7rem] font-normal font-['Public_Sans'] leading-none">Mon-Fri, 9AM-6PM EST</div>
                                            </div>
                                        </div>
                                        <div className="w-full flex gap-4 items-start">
                                            <div className="p-2 bg-[#aa2a46] rounded-full flex items-center justify-center">
                                                <div className="w-3 h-4 outline outline-2 outline-[#fffced]" />
                                                <div className="w-1 h-1 outline outline-2 outline-[#fffced] ml-2 mt-1" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="text-[#fffced] text-sm font-medium font-['Public_Sans'] leading-snug">Address</div>
                                                <div className="text-white/70 text-xs font-normal font-['Public_Sans'] leading-5">123 Music Row</div>
                                                <div className="text-white/70 text-xs font-normal font-['Public_Sans'] leading-5">Nashville, TN 37203</div>
                                                <div className="text-white/70 text-xs font-normal font-['Public_Sans'] leading-5">United States</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full px-5 pt-5 pb-5 bg-[#1d1e26] rounded-lg shadow-md flex flex-col gap-5">
                                    <div className="text-[#fffced] text-lg font-medium font-['Roboto'] leading-7">Office Hours</div>
                                    <div className="w-full flex flex-col gap-2">
                                        <div className="flex justify-between items-start pb-1">
                                            <div className="text-white/70 text-xs font-normal font-['Public_Sans'] leading-5">Monday - Friday</div>
                                            <div className="text-[#fffced] text-xs font-medium font-['Public_Sans'] leading-5">9:00 AM - 6:00 PM</div>
                                        </div>
                                        <div className="flex justify-between items-start pb-1">
                                            <div className="text-white/70 text-xs font-normal font-['Public_Sans'] leading-5">Saturday</div>
                                            <div className="text-[#fffced] text-xs font-medium font-['Public_Sans'] leading-5">10:00 AM - 4:00 PM</div>
                                        </div>
                                        <div className="flex justify-between items-start pb-1">
                                            <div className="text-white/70 text-xs font-normal font-['Public_Sans'] leading-5">Sunday</div>
                                            <div className="text-white/50 text-xs font-normal font-['Public_Sans'] leading-5">Closed</div>
                                        </div>
                                        <div className="w-full pt-4 border border-white/10 rounded flex flex-col items-start">
                                            <div className="text-white/60 text-[0.7rem] font-normal font-['Public_Sans'] leading-none">All times are Eastern Standard Time (EST)</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full px-5 pt-5 pb-5 bg-[#1d1e26] rounded-lg shadow-md flex flex-col gap-5 justify-center items-start">
                                    <div className="text-[#fffced] text-lg font-medium font-['Roboto'] leading-7">Follow Us</div>
                                    <div className="w-full flex gap-4 justify-center items-start">
                                        <div className="p-2 bg-white/10 rounded-full flex items-center justify-center">
                                            <div className="w-5 h-4 bg-[#fffced]" />
                                        </div>
                                        <div className="p-2 bg-white/10 rounded-full flex items-center justify-center">
                                            <div className="w-4 h-3 bg-[#fffced]" />
                                        </div>
                                        <div className="p-2 bg-white/10 rounded-full flex items-center justify-center">
                                            <div className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactTablet() {
        return (
            <div className="w-full min-h-screen bg-black flex flex-col items-center justify-start overflow-hidden">
                <div className="w-full bg-white flex flex-col items-center justify-start overflow-hidden">
                    <div className="w-full bg-[#1a1b22] flex flex-col items-center justify-start">
                        <div className="w-[95vw] max-w-[768px] bg-[#21212b] flex flex-col items-start justify-start">
                            <div className="w-full px-6 py-4 flex flex-col items-center justify-start">
                                <div className="w-full p-2 flex flex-col items-start justify-start gap-2">
                                    <div className="w-full flex flex-col items-start justify-center gap-4 pr-[40vw] pb-1">
                                        <h1 className="text-white text-nowrap font-bold text-[3.5rem] leading-[4.1rem] font-['Roboto']">Contact Us</h1>
                                        <p className="w-[55vw] max-w-[425px] text-white/80 text-base font-normal font-['Roboto'] leading-snug">Get in touch with the Soul Felt Music team. We're here to help with any questions about our artists, music, or community.</p>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-center justify-center gap-16">
                                    {/* Contact Form */}
                                    <div className="w-full bg-[#1d1e26] rounded-xl shadow-lg p-12 flex flex-col gap-12">
                                        {/* Tabs */}
                                        <div className="flex flex-row gap-6 pb-2 border-b border-white/10">
                                            <div className="px-3 pb-7 border-b-2 border-[#aa2a46] text-[#aa2a46] text-2xl font-medium font-['Public_Sans']">General Inquiry</div>
                                            <div className="px-3 pb-7 text-white/60 text-2xl font-medium font-['Public_Sans']">Artist Submissions</div>
                                            <div className="px-3 pb-7 text-white/60 text-2xl font-medium font-['Public_Sans']">Press & Media</div>
                                        </div>
                                        {/* Form Fields */}
                                        <form className="flex flex-col gap-9">
                                            <div className="flex flex-col gap-6">
                                                <div className="relative w-full">
                                                    <label className="block text-[#fffced] text-xl font-medium font-['Public_Sans'] mb-1">Full Name *</label>
                                                    <input type="text" placeholder="Enter your full name" className="w-full h-16 bg-[#060200] rounded-md border border-white/10 text-black text-xl font-normal font-['Public_Sans'] px-6" />
                                                </div>
                                                <div className="relative w-full">
                                                    <label className="block text-[#fffced] text-xl font-medium font-['Public_Sans'] mb-1">Email Address *</label>
                                                    <input type="email" placeholder="Enter your email" className="w-full h-16 bg-[#060200] rounded-md border border-white/10 text-black text-xl font-normal font-['Public_Sans'] px-6" />
                                                </div>
                                            </div>
                                            <div className="relative w-full">
                                                <label className="block text-[#fffced] text-xl font-medium font-['Public_Sans'] mb-1">Subject *</label>
                                                <input type="text" placeholder="What's this about?" className="w-full h-16 bg-[#060200] rounded-md border border-white/10 text-black text-xl font-normal font-['Public_Sans'] px-6" />
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label className="block text-[#fffced] text-xl font-medium font-['Public_Sans']">Message *</label>
                                                <textarea className="w-full min-h-[12rem] bg-[#060200] rounded-md border border-white/10 text-black text-xl font-normal font-['Public_Sans'] px-6 py-3" />
                                            </div>
                                            <button type="submit" className="w-full py-6 bg-[#aa2a46] rounded-md text-[#fffced] text-2xl font-medium font-['Public_Sans']">Send Message</button>
                                        </form>
                                    </div>
                                    {/* Contact Details */}
                                    <div className="w-full flex flex-col gap-12">
                                        {/* Get In Touch */}
                                        <div className="w-full bg-[#1d1e26] rounded-xl shadow-lg p-9 flex flex-col gap-9">
                                            <div className="text-[#fffced] text-3xl font-medium font-['Roboto']">Get In Touch</div>
                                            <div className="flex flex-col gap-9">
                                                {/* Email */}
                                                <div className="flex flex-row gap-6 items-start">
                                                    <div className="p-4 bg-[#aa2a46] rounded-full flex items-center justify-center">
                                                        {/* Email Icon Placeholder */}
                                                        <span className="w-8 h-6 block bg-[#fffced] rounded" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[#fffced] text-2xl font-medium font-['Public_Sans']">Email</div>
                                                        <div className="text-white/70 text-xl font-normal font-['Public_Sans']">hello@soulfeltmusic.com</div>
                                                        <div className="text-white/70 text-xl font-normal font-['Public_Sans']">press@soulfeltmusic.com</div>
                                                    </div>
                                                </div>
                                                {/* Phone */}
                                                <div className="flex flex-row gap-6 items-start">
                                                    <div className="p-4 bg-[#aa2a46] rounded-full flex items-center justify-center">
                                                        {/* Phone Icon Placeholder */}
                                                        <span className="w-6 h-6 block bg-[#fffced] rounded" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[#fffced] text-2xl font-medium font-['Public_Sans']">Phone</div>
                                                        <div className="text-white/70 text-xl font-normal font-['Public_Sans']">+1 (555) 123-4567</div>
                                                        <div className="text-white/50 text-lg font-normal font-['Public_Sans']">Mon-Fri, 9AM-6PM EST</div>
                                                    </div>
                                                </div>
                                                {/* Address */}
                                                <div className="flex flex-row gap-6 items-start">
                                                    <div className="p-4 bg-[#aa2a46] rounded-full flex items-center justify-center">
                                                        {/* Address Icon Placeholder */}
                                                        <span className="w-6 h-8 block bg-[#fffced] rounded" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[#fffced] text-2xl font-medium font-['Public_Sans']">Address</div>
                                                        <div className="text-white/70 text-xl font-normal font-['Public_Sans']">123 Music Row</div>
                                                        <div className="text-white/70 text-xl font-normal font-['Public_Sans']">Nashville, TN 37203</div>
                                                        <div className="text-white/70 text-xl font-normal font-['Public_Sans']">United States</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Office Hours */}
                                        <div className="w-full bg-[#1d1e26] rounded-xl shadow-lg p-9 flex flex-col gap-6">
                                            <div className="text-[#fffced] text-3xl font-medium font-['Roboto']">Office Hours</div>
                                            <div className="flex flex-col gap-3">
                                                <div className="flex flex-row justify-between">
                                                    <span className="text-white/70 text-xl font-normal font-['Public_Sans']">Monday - Friday</span>
                                                    <span className="text-[#fffced] text-xl font-medium font-['Public_Sans']">9:00 AM - 6:00 PM</span>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <span className="text-white/70 text-xl font-normal font-['Public_Sans']">Saturday</span>
                                                    <span className="text-[#fffced] text-xl font-medium font-['Public_Sans']">10:00 AM - 4:00 PM</span>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <span className="text-white/70 text-xl font-normal font-['Public_Sans']">Sunday</span>
                                                    <span className="text-white/50 text-xl font-normal font-['Public_Sans']">Closed</span>
                                                </div>
                                                <div className="pt-6 border-t border-white/10">
                                                    <span className="text-white/60 text-lg font-normal font-['Public_Sans']">All times are Eastern Standard Time (EST)</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Follow Us */}
                                        <div className="w-full bg-[#1d1e26] rounded-xl shadow-lg p-9 flex flex-col gap-9">
                                            <div className="text-[#fffced] text-3xl font-medium font-['Roboto']">Follow Us</div>
                                            <div className="flex flex-row gap-6 items-center">
                                                {/* Social Icons Placeholder */}
                                                <span className="w-8 h-6 block bg-white/10 rounded-full" />
                                                <span className="w-6 h-5 block bg-white/10 rounded-full" />
                                                <span className="w-8 h-8 block bg-white/10 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

  function ContactLaptop() {
        return (
            <div className="w-full min-h-screen bg-white flex flex-col items-center  overflow-hidden">
                <div className="w-full bg-white flex flex-col items-center justify-center gap-6 overflow-hidden">
                    <div className="w-full py-[9vw] bg-[#1a1b22] flex flex-col items-center justify-start gap-2.5">
                        <div className="w-[80vw] max-w-[1024px] px-[5vw] py-[2.5vw] bg-[#21212b] flex flex-col items-start justify-start gap-2">
                            <div className="relative w-full min-h-[60vh]">
                                {/* Header Section */}
                                <div className="absolute left-0 top-0 w-[85vw] max-w-[876px] h-[9vw] max-h-[136px] flex flex-col justify-center items-start gap-4 pl-1 pr-[30vw] pb-1">
                                    <h1 className="text-white font-bold text-[4vw] leading-[4.8vw] font-['Roboto']">Contact Us</h1>
                                    <p className="w-[44vw] max-w-[450px] text-white/80 text-base font-normal font-['Roboto'] leading-snug">Get in touch with the Soul Felt Music team. We're here to help with any questions about our artists, music, or community.</p>
                                </div>
                                {/* Main Content Section */}
                                <div className="absolute left-0 top-[12vw] flex flex-row justify-end items-start gap-[3vw] w-full">
                                    {/* Contact Form */}
                                    <div className="bg-[#1d1e26] rounded-lg shadow-lg p-[2vw] flex flex-col gap-6 min-w-[32vw] max-w-[40vw]">
                                        {/* Tabs */}
                                        <div className="flex flex-row gap-3 pb-1 border-b border-white/10">
                                            <div className="px-2 pb-4 border-b-2 border-[#aa2a46] text-[#aa2a46] text-base font-medium font-['Public_Sans']">General Inquiry</div>
                                            <div className="px-2 pb-4 text-white/60 text-base font-medium font-['Public_Sans']">Artist Submissions</div>
                                            <div className="px-2 pb-4 text-white/60 text-base font-medium font-['Public_Sans']">Press & Media</div>
                                        </div>
                                        {/* Form Fields */}
                                        <form className="flex flex-col gap-5">
                                            <div className="flex flex-row gap-3">
                                                <div className="relative w-1/2">
                                                    <label className="block text-[#fffced] text-sm font-medium font-['Public_Sans'] mb-1">Full Name *</label>
                                                    <input type="text" placeholder="Enter your full name" className="w-full h-12 bg-[#060200] rounded-md border border-white/10 text-black text-base font-normal font-['Public_Sans'] px-3" />
                                                </div>
                                                <div className="relative w-1/2">
                                                    <label className="block text-[#fffced] text-sm font-medium font-['Public_Sans'] mb-1">Email Address *</label>
                                                    <input type="email" placeholder="Enter your email" className="w-full h-12 bg-[#060200] rounded-md border border-white/10 text-black text-base font-normal font-['Public_Sans'] px-3" />
                                                </div>
                                            </div>
                                            <div className="relative w-full">
                                                <label className="block text-[#fffced] text-sm font-medium font-['Public_Sans'] mb-1">Subject *</label>
                                                <input type="text" placeholder="What's this about?" className="w-full h-12 bg-[#060200] rounded-md border border-white/10 text-black text-base font-normal font-['Public_Sans'] px-3" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="block text-[#fffced] text-sm font-medium font-['Public_Sans']">Message *</label>
                                                <textarea className="w-full min-h-[8rem] bg-[#060200] rounded-md border border-white/10 text-black text-base font-normal font-['Public_Sans'] px-3 py-2" />
                                            </div>
                                            <button type="submit" className="w-full py-3 bg-[#aa2a46] rounded-md text-[#fffced] text-base font-medium font-['Public_Sans']">Send Message</button>
                                        </form>
                                    </div>
                                    {/* Contact Details */}
                                    <div className="flex flex-col gap-7 min-w-[22vw] max-w-[28vw]">
                                        {/* Get In Touch */}
                                        <div className="bg-[#1d1e26] rounded-lg shadow-lg p-4 flex flex-col gap-5">
                                            <div className="text-[#fffced] text-xl font-medium font-['Roboto']">Get In Touch</div>
                                            <div className="flex flex-col gap-5">
                                                {/* Email */}
                                                <div className="flex flex-row gap-3 items-start">
                                                    <div className="p-2 bg-[#aa2a46] rounded-full flex items-center justify-center">
                                                        {/* Email Icon Placeholder */}
                                                        <span className="w-5 h-4 block bg-[#fffced] rounded" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[#fffced] text-base font-medium font-['Public_Sans']">Email</div>
                                                        <div className="text-white/70 text-sm font-normal font-['Public_Sans']">hello@soulfeltmusic.com</div>
                                                        <div className="text-white/70 text-sm font-normal font-['Public_Sans']">press@soulfeltmusic.com</div>
                                                    </div>
                                                </div>
                                                {/* Phone */}
                                                <div className="flex flex-row gap-3 items-start">
                                                    <div className="p-2 bg-[#aa2a46] rounded-full flex items-center justify-center">
                                                        {/* Phone Icon Placeholder */}
                                                        <span className="w-4 h-4 block bg-[#fffced] rounded" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[#fffced] text-base font-medium font-['Public_Sans']">Phone</div>
                                                        <div className="text-white/70 text-sm font-normal font-['Public_Sans']">+1 (555) 123-4567</div>
                                                        <div className="text-white/50 text-xs font-normal font-['Public_Sans']">Mon-Fri, 9AM-6PM EST</div>
                                                    </div>
                                                </div>
                                                {/* Address */}
                                                <div className="flex flex-row gap-3 items-start">
                                                    <div className="p-2 bg-[#aa2a46] rounded-full flex items-center justify-center">
                                                        {/* Address Icon Placeholder */}
                                                        <span className="w-4 h-5 block bg-[#fffced] rounded" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[#fffced] text-base font-medium font-['Public_Sans']">Address</div>
                                                        <div className="text-white/70 text-sm font-normal font-['Public_Sans']">123 Music Row</div>
                                                        <div className="text-white/70 text-sm font-normal font-['Public_Sans']">Nashville, TN 37203</div>
                                                        <div className="text-white/70 text-sm font-normal font-['Public_Sans']">United States</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Office Hours */}
                                        <div className="bg-[#1d1e26] rounded-lg shadow-lg p-4 flex flex-col gap-3">
                                            <div className="text-[#fffced] text-xl font-medium font-['Roboto']">Office Hours</div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex flex-row justify-between">
                                                    <span className="text-white/70 text-sm font-normal font-['Public_Sans']">Monday - Friday</span>
                                                    <span className="text-[#fffced] text-sm font-medium font-['Public_Sans']">9:00 AM - 6:00 PM</span>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <span className="text-white/70 text-sm font-normal font-['Public_Sans']">Saturday</span>
                                                    <span className="text-[#fffced] text-sm font-medium font-['Public_Sans']">10:00 AM - 4:00 PM</span>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <span className="text-white/70 text-sm font-normal font-['Public_Sans']">Sunday</span>
                                                    <span className="text-white/50 text-sm font-normal font-['Public_Sans']">Closed</span>
                                                </div>
                                                <div className="pt-3 border-t border-white/10">
                                                    <span className="text-white/60 text-xs font-normal font-['Public_Sans']">All times are Eastern Standard Time (EST)</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Follow Us */}
                                        <div className="bg-[#1d1e26] rounded-lg shadow-lg p-4 flex flex-col gap-5">
                                            <div className="text-[#fffced] text-xl font-medium font-['Roboto']">Follow Us</div>
                                            <div className="flex flex-row gap-3 items-center">
                                                {/* Social Icons Placeholder */}
                                                <span className="w-5 h-4 block bg-white/10 rounded-full" />
                                                <span className="w-4 h-3 block bg-white/10 rounded-full" />
                                                <span className="w-5 h-5 block bg-white/10 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

function ContactDesktop() {
    return (
        <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full bg-white flex flex-col items-center justify-center gap-6 overflow-hidden">
                <div className="w-full  bg-[#1a1b22] flex flex-col items-center justify-start gap-2.5">
                    <div className="w-[80vw] max-w-[1440px] px-[7vw] py-[3.5vw] bg-[#21212b] flex flex-col items-start justify-start gap-2.5">
                        <div className="relative w-full min-h-[80vh]">
                            {/* Header Section */}
                            <div className="relative left-0 top-0 w-[85vw] max-w-[1232px] h-[13vw] max-h-[192px] flex flex-col justify-center items-start gap-6 pl-1 pr-[40vw] pb-1">
                                <h1 className="text-white font-bold text-[5.5vw] text-nowrap leading-[6vw] font-['Roboto']">Contact Us</h1>
                                <p className="w-[44vw] max-w-[633px] text-white/80 text-xl font-normal font-['Roboto'] leading-loose">Get in touch with the Soul Felt Music team. We're here to help with any questions about our artists, music, or community.</p>
                            </div>
                            {/* Main Content Section */}
                            <div className="relative left-0 top-[3vw] flex flex-row justify-end items-start gap-[5vw] w-full">
                                {/* Contact Form */}
                                <div className="bg-[#1d1e26] rounded-lg shadow-lg p-[2.5vw] flex flex-col gap-8 min-w-[32vw] max-w-[40vw]">
                                    {/* Tabs */}
                                    <div className="flex flex-row gap-4 pb-1 border-b border-white/10">
                                        <div className="px-2 pb-5 border-b-2 border-[#aa2a46] text-[#aa2a46] text-lg font-medium font-['Public_Sans']">General Inquiry</div>
                                        <div className="px-2 pb-5 text-white/60 text-lg font-medium font-['Public_Sans']">Artist Submissions</div>
                                        <div className="px-2 pb-5 text-white/60 text-lg font-medium font-['Public_Sans']">Press & Media</div>
                                    </div>
                                    {/* Form Fields */}
                                    <form className="flex flex-col gap-7">
                                        <div className="flex flex-row gap-4">
                                            <div className="relative w-1/2">
                                                <label className="block text-[#fffced] text-base font-medium font-['Public_Sans'] mb-1">Full Name *</label>
                                                <input type="text" placeholder="Enter your full name" className="w-full h-14 bg-[#060200] rounded-md border border-white/10 text-black text-lg font-normal font-['Public_Sans'] px-4" />
                                            </div>
                                            <div className="relative w-1/2">
                                                <label className="block text-[#fffced] text-base font-medium font-['Public_Sans'] mb-1">Email Address *</label>
                                                <input type="email" placeholder="Enter your email" className="w-full h-14 bg-[#060200] rounded-md border border-white/10 text-black text-lg font-normal font-['Public_Sans'] px-4" />
                                            </div>
                                        </div>
                                        <div className="relative w-full">
                                            <label className="block text-[#fffced] text-base font-medium font-['Public_Sans'] mb-1">Subject *</label>
                                            <input type="text" placeholder="What's this about?" className="w-full h-14 bg-[#060200] rounded-md border border-white/10 text-black text-lg font-normal font-['Public_Sans'] px-4" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="block text-[#fffced] text-base font-medium font-['Public_Sans']">Message *</label>
                                            <textarea className="w-full min-h-[12rem] bg-[#060200] rounded-md border border-white/10 text-black text-lg font-normal font-['Public_Sans'] px-4 py-2" />
                                        </div>
                                        <button type="submit" className="w-full py-4 bg-[#aa2a46] rounded-md text-[#fffced] text-lg font-medium font-['Public_Sans']">Send Message</button>
                                    </form>
                                </div>
                                {/* Contact Details */}
                                <div className="flex flex-col gap-9 min-w-[22vw] max-w-[28vw]">
                                    {/* Get In Touch */}
                                    <div className="bg-[#1d1e26] rounded-lg shadow-lg p-6 flex flex-col gap-7">
                                        <div className="text-[#fffced] text-2xl font-medium font-['Roboto']">Get In Touch</div>
                                        <div className="flex flex-col gap-7">
                                            {/* Email */}
                                            <div className="flex flex-row gap-4 items-start">
                                                <div className="p-3 bg-[#aa2a46] rounded-full flex items-center justify-center">
                                                    {/* Email Icon Placeholder */}
                                                    <span className="w-6 h-5 block bg-[#fffced] rounded" />
                                                </div>
                                                <div>
                                                    <div className="text-[#fffced] text-lg font-medium font-['Public_Sans']">Email</div>
                                                    <div className="text-white/70 text-base font-normal font-['Public_Sans']">hello@soulfeltmusic.com</div>
                                                    <div className="text-white/70 text-base font-normal font-['Public_Sans']">press@soulfeltmusic.com</div>
                                                </div>
                                            </div>
                                            {/* Phone */}
                                            <div className="flex flex-row gap-4 items-start">
                                                <div className="p-3 bg-[#aa2a46] rounded-full flex items-center justify-center">
                                                    {/* Phone Icon Placeholder */}
                                                    <span className="w-5 h-5 block bg-[#fffced] rounded" />
                                                </div>
                                                <div>
                                                    <div className="text-[#fffced] text-lg font-medium font-['Public_Sans']">Phone</div>
                                                    <div className="text-white/70 text-base font-normal font-['Public_Sans']">+1 (555) 123-4567</div>
                                                    <div className="text-white/50 text-sm font-normal font-['Public_Sans']">Mon-Fri, 9AM-6PM EST</div>
                                                </div>
                                            </div>
                                            {/* Address */}
                                            <div className="flex flex-row gap-4 items-start">
                                                <div className="p-3 bg-[#aa2a46] rounded-full flex items-center justify-center">
                                                    {/* Address Icon Placeholder */}
                                                    <span className="w-5 h-6 block bg-[#fffced] rounded" />
                                                </div>
                                                <div>
                                                    <div className="text-[#fffced] text-lg font-medium font-['Public_Sans']">Address</div>
                                                    <div className="text-white/70 text-base font-normal font-['Public_Sans']">123 Music Row</div>
                                                    <div className="text-white/70 text-base font-normal font-['Public_Sans']">Nashville, TN 37203</div>
                                                    <div className="text-white/70 text-base font-normal font-['Public_Sans']">United States</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Office Hours */}
                                    <div className="bg-[#1d1e26] rounded-lg shadow-lg p-6 flex flex-col gap-4">
                                        <div className="text-[#fffced] text-2xl font-medium font-['Roboto']">Office Hours</div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row justify-between">
                                                <span className="text-white/70 text-base font-normal font-['Public_Sans']">Monday - Friday</span>
                                                <span className="text-[#fffced] text-base font-medium font-['Public_Sans']">9:00 AM - 6:00 PM</span>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <span className="text-white/70 text-base font-normal font-['Public_Sans']">Saturday</span>
                                                <span className="text-[#fffced] text-base font-medium font-['Public_Sans']">10:00 AM - 4:00 PM</span>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <span className="text-white/70 text-base font-normal font-['Public_Sans']">Sunday</span>
                                                <span className="text-white/50 text-base font-normal font-['Public_Sans']">Closed</span>
                                            </div>
                                            <div className="pt-4 border-t border-white/10">
                                                <span className="text-white/60 text-sm font-normal font-['Public_Sans']">All times are Eastern Standard Time (EST)</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Follow Us */}
                                    <div className="bg-[#1d1e26] rounded-lg shadow-lg p-6 flex flex-col gap-7">
                                        <div className="text-[#fffced] text-2xl font-medium font-['Roboto']">Follow Us</div>
                                        <div className="flex flex-row gap-4 items-center">
                                            {/* Social Icons Placeholder */}
                                            <span className="w-6 h-5 block bg-white/10 rounded-full" />
                                            <span className="w-5 h-4 block bg-white/10 rounded-full" />
                                            <span className="w-6 h-6 block bg-white/10 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

  return (
    <section>
        <div className='Mobile block md:hidden lg:hidden xl:hidden'>
            <ContactMobile/>
        </div>
        <div className='Tablet hidden md:block lg:hidden xl:hidden'>
            <ContactTablet/>
        </div>
        <div className='Desktop hidden md:hidden lg:block xl:block'>
            <ContactDesktop/>
        </div>
        <div className="Laptop hidden md:hidden lg:hidden xl:hidden">
            <ContactLaptop/>
        </div>
        
    </section>
  );
};

export default Contact;

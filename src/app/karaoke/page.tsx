"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Users, Music2, Star, CheckCircle2, Loader2 } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import { cn } from "@/lib/utils";
import { format, addDays, startOfDay } from "date-fns";

const rooms = [
    { id: "r1", name: "Neon Seoul (Standard)", capacity: "2-4", price: 1000, image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
    { id: "r2", name: "Cyberpunk Vibe (Large)", capacity: "5-8", price: 1000, image: "https://images.unsplash.com/photo-1514525253344-f814d0c9e58a?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
    { id: "r3", name: "Aesthetic K-Pop (VIP)", capacity: "8-12", price: 1000, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800", rating: 5.0 },
];

const timeSlots = ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"];

export default function KaraokePage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
    const [selectedRoom, setSelectedRoom] = useState(rooms[0].id);
    const [selectedTime, setSelectedTime] = useState("");
    const [isBooked, setIsBooked] = useState(false);
    const [isBooking, setIsBooking] = useState(false);

    const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

    const handleBook = async () => {
        if (!session) {
            router.push("/auth/signin");
            return;
        }
        if (!selectedTime) return;

        setIsBooking(true);
        try {
            const res = await fetch("/api/karaoke/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roomId: selectedRoom,
                    date: selectedDate,
                    startTime: selectedTime,
                    amount: rooms.find(r => r.id === selectedRoom)?.price || 0,
                }),
            });

            if (res.ok) {
                setIsBooked(true);
                setTimeout(() => setIsBooked(false), 5000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="max-w-xl mb-16">
                <h1 className="text-5xl font-black tracking-tight mb-4 italic uppercase">BOOK A <span className="text-purple-500 font-extrabold">NORAEBANG</span></h1>
                <p className="text-white/50 text-lg">Private rooms, premium sound, and the latest K-Pop hits. Exclusive to K-Town members.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Room Selection */}
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-2xl font-black flex items-center gap-2 uppercase italic">
                        <Music2 className="text-purple-500" /> Choose Your Style
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {rooms.map((room) => (
                            <GlassCard
                                key={room.id}
                                hover={false}
                                className={cn(
                                    "p-0 overflow-hidden cursor-pointer transition-all duration-300 border-2",
                                    selectedRoom === room.id ? "border-brand-purple shadow-purple-500/20 shadow-2xl scale-[1.02]" : "border-white/5 opacity-60 hover:opacity-100"
                                )}
                                onClick={() => setSelectedRoom(room.id)}
                            >
                                <div className="h-48 relative">
                                    <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-[10px] font-black flex items-center gap-1">
                                        <Star size={10} className="fill-brand-purple text-brand-purple" /> {room.rating}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-bold">{room.name}</h3>
                                        <span className="text-brand-purple font-black">₹{room.price}/hr</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
                                        <div className="flex items-center gap-1.5"><Users size={14} /> {room.capacity} GUESTS</div>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* Booking Sidebar */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-black flex items-center gap-2 uppercase italic">
                        <CalendarIcon className="text-purple-500" /> Availability
                    </h2>
                    <GlassCard className="space-y-8 sticky top-32">
                        {/* Date Picker */}
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-4">Select Date</label>
                            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                                {dates.map((date) => {
                                    const isSelected = format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                                    return (
                                        <button
                                            key={date.toISOString()}
                                            onClick={() => setSelectedDate(date)}
                                            className={cn(
                                                "flex-shrink-0 w-14 h-20 rounded-xl flex flex-col items-center justify-center transition-all",
                                                isSelected ? "bg-brand-purple text-white shadow-lg shadow-purple-500/20" : "glass hover:bg-white/5 text-white/50"
                                            )}
                                        >
                                            <span className="text-[10px] uppercase font-bold">{format(date, "EEE")}</span>
                                            <span className="text-lg font-black">{format(date, "d")}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Time Picker */}
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-4">Select Time</label>
                            <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={cn(
                                            "py-3 rounded-lg text-xs font-bold transition-all border",
                                            selectedTime === time
                                                ? "bg-white text-purple-900 border-white"
                                                : "glass border-white/5 text-white/50 hover:border-white/20"
                                        )}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-sm">
                                    <p className="text-white/40 uppercase font-black text-[10px] tracking-widest">Total Amount</p>
                                    <p className="text-2xl font-black italic">₹{rooms.find(r => r.id === selectedRoom)?.price}</p>
                                </div>
                                <Clock size={24} className="text-white/20" />
                            </div>

                            <NeonButton
                                size="lg"
                                className="w-full h-14"
                                disabled={!selectedTime || isBooking}
                                onClick={handleBook}
                            >
                                {isBooking ? <Loader2 className="animate-spin" /> :
                                    session ? "Confirm Booking" : "Sign in to Book"}
                            </NeonButton>
                        </div>
                    </GlassCard>
                </div>
            </div>

            <AnimatePresence>
                {isBooked && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-12 right-12 z-50"
                    >
                        <GlassCard className="border-green-500/50 bg-green-500/10 flex items-center gap-4 py-4 px-8">
                            <CheckCircle2 className="text-green-500" />
                            <div>
                                <p className="font-bold text-white">Booking Confirmed!</p>
                                <p className="text-xs text-white/50">Details sent to your profile.</p>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

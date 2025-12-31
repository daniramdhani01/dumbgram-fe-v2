"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, ImageIcon, Heart, Send, Smile } from "lucide-react";
import Image from "next/image";

interface RoomChatProps {
    username?: string;
    className?: string; 
}

// Dummy messages data
const dummyMessages = [
    { id: 1, sender: "them", text: "Hey! How are you doing?", time: "10:30 AM" },
    { id: 2, sender: "me", text: "I'm doing great, thanks! How about you?", time: "10:31 AM" },
    { id: 3, sender: "them", text: "Pretty good! Just finished working on a new project", time: "10:32 AM" },
    { id: 4, sender: "me", text: "That's awesome! What kind of project?", time: "10:33 AM" },
    { id: 5, sender: "them", text: "It's a social media app, similar to Instagram 📸", time: "10:34 AM" },
    { id: 6, sender: "me", text: "Wow, that sounds really cool! Can I see it?", time: "10:35 AM" },
    { id: 7, sender: "them", text: "Sure! I'll send you the link later 😊", time: "10:36 AM" },
];

// User data mapping (would come from API in real app)
const userDataMap: Record<string, { displayName: string; avatar: string }> = {
    alicefreeman: {
        displayName: "Alice Freeman",
        avatar: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
    },
    josefina: {
        displayName: "Josefina",
        avatar: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
    },
    velazquez: {
        displayName: "Velazquez",
        avatar: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
    },
    barrera: {
        displayName: "Barrera",
        avatar: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
    },
    mikejohnson: {
        displayName: "Mike Johnson",
        avatar: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
    },
    sarahwilliams: {
        displayName: "Sarah Williams",
        avatar: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
    },
    davidchen: {
        displayName: "David Chen",
        avatar: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
    },
    emilybrown: {
        displayName: "Emily Brown",
        avatar: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
    },
    jameslee: {
        displayName: "James Lee",
        avatar: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
    },
    oliviamartin: {
        displayName: "Olivia Martin",
        avatar: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
    },
};

export default function RoomMessage({ username, className }: RoomChatProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto scroll to bottom when chat opens or username changes
    useEffect(() => {
        if (username) {
            messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
        }
    }, [username]);

    // No chat selected state
    if (!username) {
        return (
            <div className={cn(
                "flex flex-col justify-center items-center",
                "h-[calc(100vh-72px)]",
                className
            )}>
                <div className="w-24 h-24 border-4 border-primary rounded-full flex items-center justify-center mb-4">
                    <Send className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-1">Your messages</h2>
                <p className="text-muted-foreground text-sm mb-4">Send a message to start a chat.</p>
                <Button variant="rainbow" size="sm">
                    Send message
                </Button>
            </div>
        );
    }

    const userData = userDataMap[username] || { 
        displayName: username, 
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}` 
    };

    return (
        <div className={cn(
            "flex flex-col h-[calc(100vh-72px)]",
            className
        )}>
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-3">
                    <div className="relative inline-block p-0.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 via-rose-400 to-yellow-300">
                        <Image
                            src={userData.avatar}
                            alt={userData.displayName}
                            className="object-cover rounded-full aspect-square"
                            width={40}
                            height={40}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">{userData.displayName}</h3>
                        <p className="text-xs text-muted-foreground">Active now</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon">
                    <Info className="w-5 h-5" />
                </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {/* Profile intro at top */}
                <div className="flex flex-col items-center py-6 mb-4">
                    <div className="relative inline-block p-1 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 via-rose-400 to-yellow-300 mb-3">
                        <Image
                            src={userData.avatar}
                            alt={userData.displayName}
                            className="object-cover rounded-full aspect-square"
                            width={80}
                            height={80}
                        />
                    </div>
                    <h4 className="font-semibold">{userData.displayName}</h4>
                    <p className="text-sm text-muted-foreground">@{username} · Dumbgram</p>
                    <Button variant="outline" size="sm" className="mt-3">
                        View profile
                    </Button>
                </div>

                {/* Chat Messages */}
                {dummyMessages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex",
                            msg.sender === "me" ? "justify-end" : "justify-start"
                        )}
                    >
                        {msg.sender === "them" && (
                            <div className="relative p-0.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 via-rose-400 to-yellow-300 mr-2 shrink-0 size-8">
                                <Image
                                    src={userData.avatar}
                                    alt={userData.displayName}
                                    className="object-cover rounded-full w-full h-full"
                                    width={28}
                                    height={28}
                                />
                            </div>
                        )}
                        <div
                            className={cn(
                                "max-w-[70%] px-4 py-2 rounded-3xl text-sm",
                                msg.sender === "me"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                            )}
                        >
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}
                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
                <div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
                    <Input
                        placeholder="Message..."
                        className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <ImageIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-primary">
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

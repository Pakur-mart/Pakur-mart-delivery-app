
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Bell } from "lucide-react";

interface NotificationsProps {
    onBack: () => void;
}

export default function Notifications({ onBack }: NotificationsProps) {
    // Mock notifications for now
    const notifications = [
        {
            id: 1,
            title: "Welcome to Pakur Mart!",
            message: "Thanks for joining us. Complete your profile to start receiving orders.",
            time: "Just now",
            read: false
        },
        {
            id: 2,
            title: "Tip for new riders",
            message: "Keep your GPS on for better order matching.",
            time: "1 hour ago",
            read: true
        }
    ];

    return (
        <div className="p-4 space-y-5 animate-fade-in bg-background min-h-screen">
            <Card className="border-0 shadow-lg min-h-[80vh]">
                <CardHeader className="relative pb-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-4 top-4 hover:bg-primary/10"
                        onClick={onBack}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <CardTitle className="text-2xl font-bold text-center text-primary pt-8">Notifications</CardTitle>
                    <CardDescription className="text-center">Updates and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {notifications.length > 0 ? (
                        notifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`p-4 rounded-lg border ${notif.read ? 'bg-background border-border' : 'bg-primary/5 border-primary/20'}`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`mt-1 w-2 h-2 rounded-full ${notif.read ? 'bg-muted-foreground' : 'bg-primary'}`} />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm">{notif.title}</h4>
                                        <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                                        <p className="text-[10px] text-muted-foreground/70 mt-2 text-right">{notif.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No notifications yet</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

import { useEffect, useState } from "react";
import { messaging, db } from "@/lib/firebase";
import { getToken, onMessage } from "firebase/messaging";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "./use-auth";
import { useToast } from "./use-toast";

export function useNotifications() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [permission, setPermission] = useState<NotificationPermission>("default");

    useEffect(() => {
        if (!user || !messaging) return;

        const requestPermission = async () => {
            try {
                const permission = await Notification.requestPermission();
                setPermission(permission);

                if (permission === "granted") {
                    const registration = await navigator.serviceWorker.ready;
                    const token = await getToken(messaging, {
                        vapidKey: "BM_9Z2s2q1w3e4r5t6y7u8i9o0p-1a2s3d4f5g6h7j8k9l0",
                        serviceWorkerRegistration: registration
                    });

                    if (token) {
                        console.log("FCM Token:", token);
                        // Save token to firestore
                        const userRef = doc(db, "deliveryPartners", user.uid);
                        await updateDoc(userRef, {
                            fcmTokens: arrayUnion(token)
                        });
                    }
                }
            } catch (error) {
                console.error("Error requesting notification permission:", error);
            }
        };

        requestPermission();

        // Foreground message handling
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("Foreground message received:", payload);
            toast({
                title: payload.notification?.title || "New Message",
                description: payload.notification?.body,
            });
        });

        return () => unsubscribe();
    }, [user, toast]);

    return { permission };
}

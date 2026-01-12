import { useEffect, useState } from "react";
import { messagingPromise, db } from "@/lib/firebase";
import { getToken, onMessage } from "firebase/messaging";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "./use-auth";
import { useToast } from "./use-toast";

export function useNotifications() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [permission, setPermission] = useState<NotificationPermission>("default");

    useEffect(() => {
        if (!user) return;

        let unsubscribe: (() => void) | null = null;

        const setupNotifications = async () => {
            try {
                const messaging = await messagingPromise;
                if (!messaging) {
                    console.log("Firebase Messaging not supported.");
                    return;
                }

                // Request Permissions
                if ("Notification" in window) {
                    const perm = await Notification.requestPermission();
                    setPermission(perm);

                    if (perm === "granted") {
                        try {
                            // Wait for SW ready
                            if ('serviceWorker' in navigator) {
                                const registration = await navigator.serviceWorker.ready;
                                const token = await getToken(messaging, {
                                    vapidKey: "BJAA5ZAsjGC6dn5BnY7PRdPhZqczOXs4qitKoSZsNHPamvoAkR0w_YgdJgqkIpD22-STYpAAgaYiq7m3aSoEYGw",
                                    serviceWorkerRegistration: registration
                                });

                                if (token) {
                                    console.log("FCM Token:", token);
                                    const userRef = doc(db, "deliveryPartners", user.uid);
                                    await updateDoc(userRef, {
                                        fcmTokens: arrayUnion(token),
                                        lastTokenUpdate: new Date().toISOString(),
                                        platform: 'web-pwa'
                                    });
                                }
                            }
                        } catch (tokenError) {
                            console.error("Error getting FCM token:", tokenError);
                        }
                    }
                }

                // Setup listener
                unsubscribe = onMessage(messaging, (payload) => {
                    console.log("Foreground message received:", payload);
                    toast({
                        title: payload.notification?.title || "New Message",
                        description: payload.notification?.body,
                    });
                });

            } catch (error) {
                console.error("Error setting up notifications:", error);
            }
        };

        setupNotifications();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [user, toast]);

    return { permission };
}

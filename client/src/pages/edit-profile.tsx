
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { updateDeliveryPartner } from "@/lib/firestore";
import { toast } from "sonner";

interface EditProfileProps {
    onBack: () => void;
}

export default function EditProfile({ onBack }: EditProfileProps) {
    const { deliveryPartner } = useAuth();
    const [name, setName] = useState(deliveryPartner?.name || "");
    const [phone, setPhone] = useState(deliveryPartner?.phone || "");
    const [loading, setLoading] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!deliveryPartner) return;

        setLoading(true);
        try {
            await updateDeliveryPartner(deliveryPartner.id, {
                name,
                phone,
            });
            toast.success("Profile updated successfully");
            // Optional: Refresh auth context if needed, though Firestore realtime listener might handle it if set up, 
            // but simple update is fine.
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 space-y-5 animate-fade-in bg-background min-h-screen">
            <Card className="border-0 shadow-lg">
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
                    <CardTitle className="text-2xl font-bold text-center text-primary pt-8">Edit Profile</CardTitle>
                    <CardDescription className="text-center">Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter phone number"
                                required
                                pattern="[0-9]{10}"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-4 bg-primary hover:bg-primary/90"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}


import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Loader2, Save, CreditCard } from "lucide-react";
import { updateDeliveryPartner } from "@/lib/firestore";
import { toast } from "sonner";

interface PaymentSettingsProps {
    onBack: () => void;
}

export default function PaymentSettings({ onBack }: PaymentSettingsProps) {
    const { deliveryPartner } = useAuth();
    // Assuming we might store UPI ID in the partner record, or similar
    const [upiId, setUpiId] = useState((deliveryPartner as any)?.upiId || "");
    const [accountHolder, setAccountHolder] = useState((deliveryPartner as any)?.accountHolder || "");
    const [loading, setLoading] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!deliveryPartner) return;

        setLoading(true);
        try {
            await updateDeliveryPartner(deliveryPartner.id, {
                // @ts-ignore - extending the types loosely for now or stick to strict if Schema allows
                upiId,
                accountHolder
            } as any);
            toast.success("Payment details updated successfully");
        } catch (error) {
            toast.error("Failed to update payment details");
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
                    <CardTitle className="text-2xl font-bold text-center text-primary pt-8">Payment Settings</CardTitle>
                    <CardDescription className="text-center">Manage your payout information</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 p-4 bg-muted/50 rounded-lg flex items-start gap-4">
                        <CreditCard className="w-6 h-6 text-primary mt-1" />
                        <div>
                            <p className="font-semibold text-sm">Payout Information</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Your earnings will be transferred to this account weekly.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="accountHolder">Account Holder Name</Label>
                            <Input
                                id="accountHolder"
                                value={accountHolder}
                                onChange={(e) => setAccountHolder(e.target.value)}
                                placeholder="Name as per bank/UPI"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="upiId">UPI ID</Label>
                            <Input
                                id="upiId"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                placeholder="example@upi"
                                required
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

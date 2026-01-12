
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { updateDeliveryPartner } from "@/lib/firestore";
import { toast } from "sonner";

interface VehicleDetailsProps {
    onBack: () => void;
}

export default function VehicleDetails({ onBack }: VehicleDetailsProps) {
    const { deliveryPartner } = useAuth();
    const [vehicleType, setVehicleType] = useState(deliveryPartner?.vehicleType || "");
    const [vehicleNumber, setVehicleNumber] = useState(deliveryPartner?.vehicleNumber || "");
    const [loading, setLoading] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!deliveryPartner) return;

        setLoading(true);
        try {
            await updateDeliveryPartner(deliveryPartner.id, {
                vehicleType,
                vehicleNumber,
            });
            toast.success("Vehicle details updated successfully");
        } catch (error) {
            toast.error("Failed to update vehicle details");
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
                    <CardTitle className="text-2xl font-bold text-center text-primary pt-8">Vehicle Details</CardTitle>
                    <CardDescription className="text-center">Manage your delivery vehicle info</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="vehicleType">Vehicle Type</Label>
                            <Select value={vehicleType} onValueChange={setVehicleType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select vehicle type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Bike">Bike</SelectItem>
                                    <SelectItem value="Bicycle">Bicycle</SelectItem>
                                    <SelectItem value="Scooter">Scooter</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                            <Input
                                id="vehicleNumber"
                                value={vehicleNumber}
                                onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                                placeholder="AB12CD3456"
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

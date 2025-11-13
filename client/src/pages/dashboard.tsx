import { useAuth } from "@/hooks/use-auth";
import { useOrders } from "@/hooks/use-orders";
import { OrderCard } from "@/components/order-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Truck, IndianRupee, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { deliveryPartner } = useAuth();
  const { toast } = useToast();
  
  const {
    availableOrders,
    activeOrders,
    loading,
    error,
    acceptOrder,
    declineOrder,
    markAsPickedUp,
    markAsDelivered,
  } = useOrders(deliveryPartner?.id);

  const handleAcceptOrder = async (orderId: string) => {
    if (!deliveryPartner) return;
    
    try {
      await acceptOrder(orderId, deliveryPartner.id);
      toast({
        title: "Order accepted!",
        description: "You can now pick up the order",
      });
    } catch (error) {
      toast({
        title: "Failed to accept order",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleDeclineOrder = async (orderId: string) => {
    try {
      await declineOrder(orderId);
      toast({
        title: "Order declined",
        description: "The order has been removed from your list",
      });
    } catch (error) {
      toast({
        title: "Failed to decline order",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleMarkPickedUp = async (orderId: string) => {
    try {
      await markAsPickedUp(orderId);
      toast({
        title: "Order marked as picked up",
        description: "Now on the way to customer",
      });
    } catch (error) {
      toast({
        title: "Failed to update status",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleMarkDelivered = async (orderId: string) => {
    if (!deliveryPartner) return;
    
    try {
      await markAsDelivered(orderId, deliveryPartner.id);
      toast({
        title: "Order delivered!",
        description: "Great job! Your earnings have been updated",
      });
    } catch (error) {
      toast({
        title: "Failed to mark as delivered",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const callCustomer = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const navigateToAddress = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  if (!deliveryPartner) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertDescription>
            Unable to load delivery partner information. Please contact support if this persists.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!deliveryPartner.adminApproved) {
    return (
      <div className="p-4">
        <Alert>
          <AlertDescription>
            Your account is pending admin approval. You'll be able to accept orders once approved.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Partner Header */}
      <Card className="bg-gradient-to-r from-primary to-orange-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Welcome, {deliveryPartner.name.split(' ')[0]}!</h2>
              <Badge variant="secondary" className="mt-1">
                {deliveryPartner.status.toUpperCase()}
              </Badge>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold">{deliveryPartner.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm opacity-90">{deliveryPartner.totalDeliveries} deliveries</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <IndianRupee className="w-4 h-4" />
                <p className="text-sm opacity-90">Today's Earnings</p>
              </div>
              <p className="text-2xl font-bold">₹0</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Truck className="w-4 h-4" />
                <p className="text-sm opacity-90">Deliveries</p>
              </div>
              <p className="text-2xl font-bold">{activeOrders.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Active Orders */}
      {activeOrders.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Active Orders ({activeOrders.length})</h3>
          {activeOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onMarkPickedUp={() => handleMarkPickedUp(order.id)}
              onMarkDelivered={() => handleMarkDelivered(order.id)}
              onCall={() => callCustomer(order.customerPhone)}
              onNavigate={() => navigateToAddress(order.customerAddress)}
            />
          ))}
        </div>
      )}

      {/* Available Orders */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Available Orders ({availableOrders.length})</h3>
          {loading && (
            <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full"></div>
          )}
        </div>
        
        {availableOrders.length === 0 && !loading ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No orders available at the moment</p>
              <p className="text-sm text-muted-foreground mt-1">New orders will appear here</p>
            </CardContent>
          </Card>
        ) : (
          availableOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onAccept={() => handleAcceptOrder(order.id)}
              onDecline={() => handleDeclineOrder(order.id)}
              onCall={() => callCustomer(order.customerPhone)}
              onNavigate={() => navigateToAddress(order.customerAddress)}
            />
          ))
        )}
      </div>
    </div>
  );
}

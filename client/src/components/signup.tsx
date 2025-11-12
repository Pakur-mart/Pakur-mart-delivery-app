import { signIn } from "@/lib/auth";
import { createDeliveryPartner } from "@/lib/firestore";
import { useState } from "react";
import { toast } from "sonner";

export default function Signup({ setIsSignup }: { setIsSignup: (value: boolean) => void }) {
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("")
    const [vehicleType, setVehicleType] = useState<string>("");
    const [vehicleNumber, setVehicleNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");


    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await createDeliveryPartner({
            email, password, phone, name, vehicleNumber, vehicleType
        })

        setTimeout(() => {
            setLoading(false);

            toast.success("Account created successfully ✅", {
                description: "Please wait for admin approval before logging in."
            });

            setIsSignup(false);
        }, 1200);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                padding: '32px'
            }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        background: '#FF6B35',
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        fontSize: '32px'
                    }}>
                        📝
                    </div>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px', color: '#1F2937' }}>
                        Create Account
                    </h1>
                    <p style={{ color: '#6B7280', margin: 0 }}>Delivery Partner Signup</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        background: '#FEE2E2',
                        border: '1px solid #FECACA',
                        color: '#DC2626',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                {/* Signup Form */}
                <form onSubmit={handleSignup}>

                    {/* Name */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #D1D5DB',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                        />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your full name"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #D1D5DB',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                        />
                    </div>

                    {/* Phone */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="10 digit phone number"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #D1D5DB',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                        />
                    </div>

                    {/* Vehicle */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Vehicle Type</label>
                        <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #D1D5DB',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                        >
                            <option value="">Select vehicle</option>
                            <option value="Bike">Bike</option>
                            <option value="Bicycle">Bicycle</option>
                            <option value="Scooter">Scooter</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>VehicleNumber</label>
                        <input
                            type="password"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            placeholder="Create a password"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #D1D5DB',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                        />
                    </div>


                    {/* Password */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Create Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #D1D5DB',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: loading ? '#9CA3AF' : '#FF6B35',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? "Creating Account..." : "🚀 Sign Up"}
                    </button>
                </form>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button
                        type="button"
                        onClick={() => setIsSignup(false)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#3182ce',
                            fontSize: '14px',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        Already have an account? Login
                    </button>
                </div>


            </div>
        </div>
    );
}

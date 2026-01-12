
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Phone, Mail, FileQuestion, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface HelpSupportProps {
    onBack: () => void;
}

export default function HelpSupport({ onBack }: HelpSupportProps) {
    const faqs = [
        {
            question: "How do I accept an order?",
            answer: "When a new order appears on your dashboard, simply tap the 'Accept' button. Ensure you are online to receive orders."
        },
        {
            question: "How are payouts processed?",
            answer: "Payouts are processed weekly on Mondays. Ensure your bank details or UPI ID is correctly updated in Payment Settings."
        },
        {
            question: "What if I have an issue with a delivery?",
            answer: "You can call the customer support immediately using the 'Call Support' button below or report the issue via the order details page."
        }
    ];

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
                    <CardTitle className="text-2xl font-bold text-center text-primary pt-8">Help & Support</CardTitle>
                    <CardDescription className="text-center">We are here to help you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-24 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary">
                            <Phone className="w-6 h-6 text-primary" />
                            <span>Call Support</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary">
                            <Mail className="w-6 h-6 text-primary" />
                            <span>Email Us</span>
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <FileQuestion className="w-5 h-5" />
                            Frequently Asked Questions
                        </h3>
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg text-center space-y-2">
                        <MessageCircle className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="font-medium">Still need help?</p>
                        <p className="text-sm text-muted-foreground">Our support team is available 9 AM - 9 PM</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

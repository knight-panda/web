import React from "react";
import "./AdminPricing.css";

type Plan = {
    name: string;
    subtitle: string;
    price: string;
    highlight?: string;
    badge?: string;
    features: string[];
    button: string;
    blueHeader?: boolean;
};

const plans: Plan[] = [
    {
        name: "Basic",
        subtitle: "For solo entrepreneurs",
        highlight: "₹20/month for first 3 months",
        price: "₹1,499",
        badge: "Most Popular",
        features: [
            "Earn 0.5% back on sales",
            "Get up to ₹1,10,000 in credits",
            "2% 3rd-party payment providers",
            "10 inventory locations",
            "24/7 chat support",
            "POS device selling",
        ],
        button: "Try for free",
    },
    {
        name: "Grow",
        subtitle: "For small teams",
        highlight: "₹20/month for first 3 months",
        price: "₹5,599",
        features: [
            "Earn 0.5% back on sales",
            "Get up to ₹1,70,000 in credits",
            "1% 3rd-party payment providers",
            "10 inventory locations",
            "24/7 chat support",
            "5 staff accounts",
        ],
        button: "Try for free",
    },
    {
        name: "Advanced",
        subtitle: "For global reach",
        highlight: "₹20/month for first 3 months",
        price: "₹22,680",
        features: [
            "Earn 0.5% back on sales",
            "Get up to ₹2,30,000 in credits",
            "0.6% 3rd-party payment providers",
            "Enhanced 24/7 support",
            "15 staff accounts",
        ],
        button: "Try for free",
    },
    {
        name: "Plus",
        subtitle: "For complex businesses",
        highlight: "Available on a 1- or 3-year term",
        price: "₹1,75,000",
        blueHeader: true,
        features: [
            "Competitive rates",
            "200 inventory locations",
            "Priority phone support",
            "Unlimited staff accounts",
            "Fully customizable checkout",
        ],
        button: "Get started",
    },
];

const AdminPricing: React.FC = () => {
    return (
        <div className="admin-pricing">
            {plans.map((plan, i) => (
                <div key={i} className="ap-card">
                    <div className={`ap-card-header ${plan.blueHeader ? "blue" : ""}`}>
                        {plan.highlight}
                    </div>

                    <div className="ap-card-body">
                        <div className="ap-title-row">
                            <div className="ap-title-text">{plan.name}</div>
                            {plan.badge && <span className="ap-badge">{plan.badge}</span>}
                        </div>

                        <p className="ap-subtitle">{plan.subtitle}</p>

                        <div className="ap-price">{plan.price}</div>
                        <p className="ap-small">INR/month billed yearly</p>

                        <ul className="ap-features">
                            {plan.features.map((f, idx) => (
                                <li key={idx}>✓ {f}</li>
                            ))}
                        </ul>

                        <button className="ap-btn">{plan.button}</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminPricing;
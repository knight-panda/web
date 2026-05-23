import "./StoreDomain.css";

const StoreDomain = () => {
    return (
        <div className="connect-domain">

            {/* HEADER */}
            <div className="domain-header">
                <div className="domain-title">Connect Your Domain</div>

                <div className="domain-desc">
                    Connect your custom domain to your ecommerce store
                    and start selling with your own brand identity.
                </div>
            </div>

            {/* CONTENT */}
            <div className="domain-grid">

                {/* LEFT SIDE */}
                <div className="domain-card">

                    <h2>Store Domain Setup</h2>

                    <div className="input-group">
                        <label>Custom Domain</label>

                        <input
                            type="text"
                            placeholder="example.com"
                        />
                    </div>

                    <div className="ssl-box">
                        <h3>Free SSL Certificate</h3>

                        <p>
                            SSL will automatically activate after
                            successful domain verification.
                        </p>
                    </div>

                    <button className="domain-save-btn">
                        Save & Verify Domain
                    </button>
                </div>

                {/* RIGHT SIDE */}
                <div className="domain-card">

                    <h2>DNS Configuration</h2>

                    {/* A RECORD */}
                    <div className="dns-box">

                        <div className="dns-top">
                            <h3>A Record</h3>

                            <button>
                                Copy
                            </button>
                        </div>

                        <div className="dns-row">
                            <span>Type</span>
                            <span>A</span>
                        </div>

                        <div className="dns-row">
                            <span>Host</span>
                            <span>@</span>
                        </div>

                        <div className="dns-row">
                            <span>Value</span>
                            <span>64.227.148.177</span>
                        </div>
                    </div>

                    {/* CNAME */}
                    <div className="dns-box">

                        <div className="dns-top">
                            <h3>CNAME Record</h3>

                            <button>
                                Copy
                            </button>
                        </div>

                        <div className="dns-row">
                            <span>Type</span>
                            <span>CNAME</span>
                        </div>

                        <div className="dns-row">
                            <span>Host</span>
                            <span>www</span>
                        </div>

                        <div className="dns-row">
                            <span>Value</span>
                            <span>app.yourstore.com</span>
                        </div>
                    </div>

                    <div className="info-box">
                        DNS changes may take 5 minutes to 24 hours
                        depending on your domain provider.
                    </div>

                </div>
            </div>

            {/* STEPS */}
            <div className="steps-card">

                <h2>How To Connect Domain</h2>

                <div className="step">

                    <div className="step-number">
                        1
                    </div>

                    <div>
                        <h3>Buy Domain</h3>

                        <p>
                            Purchase a domain from Hostinger,
                            GoDaddy, Namecheap or Cloudflare.
                        </p>
                    </div>
                </div>

                <div className="step">

                    <div className="step-number">
                        2
                    </div>

                    <div>
                        <h3>Open DNS Settings</h3>

                        <p>
                            Login to your domain provider and
                            open DNS Management.
                        </p>
                    </div>
                </div>

                <div className="step">

                    <div className="step-number">
                        3
                    </div>

                    <div>
                        <h3>Add DNS Records</h3>

                        <p>
                            Add the A Record and CNAME Record
                            provided above.
                        </p>
                    </div>
                </div>

                <div className="step">

                    <div className="step-number">
                        4
                    </div>

                    <div>
                        <h3>Wait For Verification</h3>

                        <p>
                            DNS propagation may take some time.
                            SSL activates automatically.
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default StoreDomain;
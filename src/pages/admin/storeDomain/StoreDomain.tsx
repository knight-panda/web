import { useEffect, useState } from "react";
import "./StoreDomain.css";
import { useAdminStoreDomain } from "../../../hooks/admin/storeDomain/useAdminStoreDomain";

const StoreDomain = () => {

    const {
        fetchStoreDomain,
        updateStoreDomain,
        loading,
    } = useAdminStoreDomain();

    const [domain, setDomain] =
        useState("");

    const [initialDomain, setInitialDomain] =
        useState("");

    // FETCH DOMAIN
    useEffect(() => {

        const fetchData = async () => {

            try {

                const response =
                    await fetchStoreDomain();

                if (response.data?.domain) {

                    setDomain(
                        response.data.domain
                    );

                    setInitialDomain(
                        response.data.domain
                    );
                }

            } catch (e) {

                console.log(e);
            }
        };

        fetchData();

    }, []);

    // CHECK DOMAIN CHANGED
    const isChanged =
        domain.trim() !==
        initialDomain.trim();

    // SAVE DOMAIN
    const handleSave = async () => {

        try {

            const response =
                await fetchStoreDomain();

            const currentData =
                response.data;

            if (!currentData) {
                return;
            }

            await updateStoreDomain({
                storeName:
                    currentData.storeName,

                storeDescription:
                    currentData.storeDescription,

                domain,

                subdomain:
                    currentData.subdomain,

                logoUrl:
                    currentData.logoUrl,

                faviconUrl:
                    currentData.faviconUrl,

                primaryColor:
                    currentData.primaryColor,

                secondaryColor:
                    currentData.secondaryColor,
            });

            // UPDATE INITIAL DOMAIN
            setInitialDomain(domain);

            alert(
                "Domain updated successfully"
            );

        } catch (e: any) {

            alert(
                e?.message ||
                "Failed to update domain"
            );
        }
    };

    return (
        <div className="sd-connect-domain">

            <div className="sd-container">

                {/* HEADER */}
                <div className="sd-header">

                    <div className="sd-title">
                        Connect Your Domain
                    </div>

                    <div className="sd-desc">
                        Connect your custom domain to your ecommerce
                        store and start selling with your own brand identity.
                    </div>
                </div>

                {/* GRID */}
                <div className="sd-grid">

                    {/* LEFT */}
                    <div className="sd-card">

                        <div className="sd-card-title">
                            Store Domain Setup
                        </div>

                        <div className="sd-input-group">

                            <label className="sd-label">
                                Custom Domain
                            </label>

                            <input
                                className="sd-input"
                                type="text"
                                value={domain}
                                onChange={(e) =>
                                    setDomain(e.target.value)
                                }
                                placeholder="example.com"
                            />
                        </div>

                        <div className="sd-ssl-box">

                            <div className="sd-ssl-title">
                                Free SSL Certificate
                            </div>

                            <div className="sd-ssl-desc">
                                SSL will automatically activate after
                                successful domain verification.
                            </div>
                        </div>

                        <button
                            className="sd-save-btn"
                            onClick={handleSave}
                            disabled={
                                loading ||
                                !isChanged
                            }
                        >
                            {
                                loading
                                    ? "Saving..."
                                    : "Save & Verify Domain"
                            }
                        </button>
                    </div>

                    {/* RIGHT */}
                    <div className="sd-card">

                        <div className="sd-card-title">
                            DNS Configuration
                        </div>

                        {/* A RECORD */}
                        <div className="sd-dns-box">

                            <div className="sd-dns-top">

                                <div className="sd-dns-title">
                                    A Record
                                </div>
                            </div>

                            <div className="sd-dns-row">
                                <div className="sd-dns-key">
                                    Type
                                </div>

                                <div className="sd-dns-value">
                                    A
                                </div>
                            </div>

                            <div className="sd-dns-row">
                                <div className="sd-dns-key">
                                    Host
                                </div>

                                <div className="sd-dns-value">
                                    @
                                </div>
                            </div>

                            <div className="sd-dns-row">
                                <div className="sd-dns-key">
                                    Value
                                </div>

                                <div className="sd-dns-value">
                                    64.227.148.177
                                </div>
                            </div>
                        </div>

                        {/* CNAME */}
                        <div className="sd-dns-box">

                            <div className="sd-dns-top">

                                <div className="sd-dns-title">
                                    CNAME Record
                                </div>
                            </div>

                            <div className="sd-dns-row">
                                <div className="sd-dns-key">
                                    Type
                                </div>

                                <div className="sd-dns-value">
                                    CNAME
                                </div>
                            </div>

                            <div className="sd-dns-row">
                                <div className="sd-dns-key">
                                    Host
                                </div>

                                <div className="sd-dns-value">
                                    www
                                </div>
                            </div>

                            <div className="sd-dns-row">
                                <div className="sd-dns-key">
                                    Value
                                </div>

                                <div className="sd-dns-value">
                                    yourstore.crazoweb.com
                                </div>
                            </div>
                        </div>

                        <div className="sd-info-box">
                            DNS changes may take 5 minutes to 24 hours
                            depending on your domain provider.
                        </div>
                    </div>
                </div>

                {/* STEPS */}
                <div className="sd-steps-card">

                    <div className="sd-steps-title">
                        How To Connect Domain
                    </div>

                    <div className="sd-step">

                        <div className="sd-step-number">
                            1
                        </div>

                        <div className="sd-step-content">

                            <div className="sd-step-title">
                                Buy Domain
                            </div>

                            <div className="sd-step-desc">
                                Purchase a domain from Hostinger,
                                GoDaddy, Namecheap or Cloudflare.
                            </div>
                        </div>
                    </div>

                    <div className="sd-step">

                        <div className="sd-step-number">
                            2
                        </div>

                        <div className="sd-step-content">

                            <div className="sd-step-title">
                                Open DNS Settings
                            </div>

                            <div className="sd-step-desc">
                                Login to your domain provider and
                                open DNS Management.
                            </div>
                        </div>
                    </div>

                    <div className="sd-step">

                        <div className="sd-step-number">
                            3
                        </div>

                        <div className="sd-step-content">

                            <div className="sd-step-title">
                                Add DNS Records
                            </div>

                            <div className="sd-step-desc">
                                Add the A Record and CNAME Record
                                provided above.
                            </div>
                        </div>
                    </div>

                    <div className="sd-step">

                        <div className="sd-step-number">
                            4
                        </div>

                        <div className="sd-step-content">

                            <div className="sd-step-title">
                                Wait For Verification
                            </div>

                            <div className="sd-step-desc">
                                DNS propagation may take some time.
                                SSL activates automatically.
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default StoreDomain;
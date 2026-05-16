import React, { useEffect, useState } from "react";
import "./StoreInformation.css";
import { useAdminStoreInformation } from "../../../hooks/admin/storeInformation/useAdminStoreInformation";

const StoreInformation = () => {
    const {
        fetchStoreInformation,
        updateStoreInformation,
        loading,
    } = useAdminStoreInformation();

    const [formData, setFormData] = useState({
        facebookUrl: "",
        instagramUrl: "",
        twitterUrl: "",
        youtubeUrl: "",
        linkedinUrl: "",
        whatsappNumber: "",

        privacyPolicy: "",
        refundPolicy: "",
        shippingPolicy: "",
        termsAndConditions: "",

        supportEmail: "",
        supportPhone: "",
        supportAddress: "",

        footerDescription: "",

        storeAddress: "",
        storeLandmark: "",
        storeCity: "",
        storeState: "",
        storeCountry: "",
        storePincode: "",

        googleMapLink: "",
    });

    const [originalData, setOriginalData] = useState<any>(null);

    //    FETCH STORE INFO
    useEffect(() => {

        fetchInitialData();

    }, []);

    const fetchInitialData = async () => {

        try {

            const res =
                await fetchStoreInformation();

            if (res.success && res.data) {

                setOriginalData(res.data);
                setFormData({
                    facebookUrl: res.data.facebookUrl || "",
                    instagramUrl: res.data.instagramUrl || "",
                    twitterUrl: res.data.twitterUrl || "",
                    youtubeUrl: res.data.youtubeUrl || "",
                    linkedinUrl: res.data.linkedinUrl || "",
                    whatsappNumber: res.data.whatsappNumber || "",
                    privacyPolicy: res.data.privacyPolicy || "",
                    refundPolicy: res.data.refundPolicy || "",
                    shippingPolicy: res.data.shippingPolicy || "",
                    termsAndConditions: res.data.termsAndConditions || "",
                    supportEmail: res.data.supportEmail || "",
                    supportPhone: res.data.supportPhone || "",
                    supportAddress: res.data.supportAddress || "",
                    footerDescription: res.data.footerDescription || "",
                    storeAddress: res.data.storeAddress || "",
                    storeLandmark: res.data.storeLandmark || "",
                    storeCity: res.data.storeCity || "",
                    storeState: res.data.storeState || "",
                    storeCountry: res.data.storeCountry || "",
                    storePincode: res.data.storePincode || "",
                    googleMapLink: res.data.googleMapLink || "",
                });
            }

        } catch (error) {

            console.log(error);
        }
    };

    //    HANDLE CHANGE
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ) => {

        const {
            name,
            value
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //    HANDLE SUBMIT
    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            const res =
                await updateStoreInformation(
                    formData
                );

            console.log(res);

        } catch (error) {

            console.log(error);
        }
    };

    const hasChanges =
        JSON.stringify(formData) !==
        JSON.stringify({

            facebookUrl: originalData?.facebookUrl || "",
            instagramUrl: originalData?.instagramUrl || "",
            twitterUrl: originalData?.twitterUrl || "",
            youtubeUrl: originalData?.youtubeUrl || "",
            linkedinUrl: originalData?.linkedinUrl || "",
            whatsappNumber: originalData?.whatsappNumber || "",
            privacyPolicy: originalData?.privacyPolicy || "",
            refundPolicy: originalData?.refundPolicy || "",
            shippingPolicy: originalData?.shippingPolicy || "",
            termsAndConditions: originalData?.termsAndConditions || "",
            supportEmail: originalData?.supportEmail || "",
            supportPhone: originalData?.supportPhone || "",
            supportAddress: originalData?.supportAddress || "",
            footerDescription: originalData?.footerDescription || "",
            storeAddress: originalData?.storeAddress || "",
            storeLandmark: originalData?.storeLandmark || "",
            storeCity: originalData?.storeCity || "",
            storeState: originalData?.storeState || "",
            storeCountry: originalData?.storeCountry || "",
            storePincode: originalData?.storePincode || "",
            googleMapLink: originalData?.googleMapLink || "",
        });

    return (

        <div className="store-info-page">

            <div className="store-info-container">

                {/* HEADER */}
                <div className="store-info-header">

                    <div>

                        <div className="si-title">
                            Store Information
                        </div>

                        <div className="si-desc">
                            Manage your store contact,
                            social links, policies and
                            address.
                        </div>

                    </div>

                    <button
                        className="save-btn"
                        onClick={handleSubmit}
                        disabled={
                            loading || !hasChanges
                        }
                    >

                        {
                            loading
                                ? "Saving..."
                                : "Save Changes"
                        }

                    </button>

                </div>

                <form className="store-info-form">

                    {/* SOCIAL LINKS */}
                    <div className="info-card">

                        <h2>
                            Social Links
                        </h2>

                        <div className="grid-2">

                            <input
                                type="text"
                                name="facebookUrl"
                                placeholder="Facebook URL"
                                value={formData.facebookUrl}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="instagramUrl"
                                placeholder="Instagram URL"
                                value={formData.instagramUrl}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="twitterUrl"
                                placeholder="Twitter URL"
                                value={formData.twitterUrl}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="youtubeUrl"
                                placeholder="Youtube URL"
                                value={formData.youtubeUrl}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="linkedinUrl"
                                placeholder="LinkedIn URL"
                                value={formData.linkedinUrl}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="whatsappNumber"
                                placeholder="WhatsApp Number"
                                value={formData.whatsappNumber}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* SUPPORT */}
                    <div className="info-card">

                        <h2>
                            Support Information
                        </h2>

                        <div className="grid-2">

                            <input
                                type="email"
                                name="supportEmail"
                                placeholder="Support Email"
                                value={formData.supportEmail}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="supportPhone"
                                placeholder="Support Phone"
                                value={formData.supportPhone}
                                onChange={handleChange}
                            />

                        </div>

                        <textarea
                            name="supportAddress"
                            placeholder="Support Address"
                            value={formData.supportAddress}
                            onChange={handleChange}
                            rows={4}
                        />

                    </div>

                    {/* STORE ADDRESS */}
                    <div className="info-card">

                        <h2>
                            Store Address
                        </h2>

                        <textarea
                            name="storeAddress"
                            placeholder="Store Address"
                            value={formData.storeAddress}
                            onChange={handleChange}
                            rows={4}
                        />

                        <div className="grid-2">

                            <input
                                type="text"
                                name="storeLandmark"
                                placeholder="Landmark"
                                value={formData.storeLandmark}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="storeCity"
                                placeholder="City"
                                value={formData.storeCity}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="storeState"
                                placeholder="State"
                                value={formData.storeState}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="storeCountry"
                                placeholder="Country"
                                value={formData.storeCountry}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="storePincode"
                                placeholder="Pincode"
                                value={formData.storePincode}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="googleMapLink"
                                placeholder="Google Map Link"
                                value={formData.googleMapLink}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* POLICIES */}
                    <div className="info-card">

                        <h2>
                            Store Policies
                        </h2>

                        <textarea
                            name="privacyPolicy"
                            placeholder="Privacy Policy"
                            value={formData.privacyPolicy}
                            onChange={handleChange}
                            rows={5}
                        />

                        <textarea
                            name="refundPolicy"
                            placeholder="Refund Policy"
                            value={formData.refundPolicy}
                            onChange={handleChange}
                            rows={5}
                        />

                        <textarea
                            name="shippingPolicy"
                            placeholder="Shipping Policy"
                            value={formData.shippingPolicy}
                            onChange={handleChange}
                            rows={5}
                        />

                        <textarea
                            name="termsAndConditions"
                            placeholder="Terms & Conditions"
                            value={formData.termsAndConditions}
                            onChange={handleChange}
                            rows={5}
                        />

                    </div>

                    {/* FOOTER */}
                    <div className="info-card">

                        <h2>
                            Footer Description
                        </h2>

                        <textarea
                            name="footerDescription"
                            placeholder="Footer Description"
                            value={formData.footerDescription}
                            onChange={handleChange}
                            rows={5}
                        />

                    </div>

                </form>

            </div>

        </div>
    );
};

export default StoreInformation;
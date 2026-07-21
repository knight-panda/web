import { useEffect, useState } from "react";

import "./AddressDialog.css";
import type { UserAddressData } from "../../models/user/address/response/UserAddressResponse ";
import { useUserAddress } from "../../hooks/user/address/useUserAddress";
import type { UserAddressRequest } from "../../models/user/address/request/UserAddressRequest";

type AddressDialogProps = {
    onClose: () => void;
    addressData?: UserAddressData;
    fetchAddress: () => Promise<any>;
    primaryColor?: string;
};

const AddressDialog: React.FC<
    AddressDialogProps
> = ({
    onClose,
    addressData,
    fetchAddress,
    primaryColor,
}) => {

        const {
            updateAddress,
            loading,
            error,

        } = useUserAddress();


        const [name, setName] =
            useState("");

        const [houseNo, setHouseNo] =
            useState("");

        const [area, setArea] =
            useState("");

        const [landmark, setLandmark] =
            useState("");

        const [city, setCity] =
            useState("");

        const [stateName, setStateName] =
            useState("");

        const [country, setCountry] =
            useState("India");

        const [pincode, setPincode] =
            useState("");

        const [formError, setFormError] =
            useState<string | null>(null);

        useEffect(() => {

            if (!addressData) return;

            setName(
                addressData.name || ""
            );

            setHouseNo(
                addressData.houseNo || ""
            );

            setArea(
                addressData.area || ""
            );

            setLandmark(
                addressData.landmark || ""
            );

            setCity(
                addressData.city || ""
            );

            setStateName(
                addressData.state || ""
            );

            setCountry(
                addressData.country || "India"
            );

            setPincode(
                addressData.pincode || ""
            );

        }, [addressData]);

        // SAVE
        const handleSave = async () => {

            try {

                setFormError(null);

                // validation
                if (!name.trim()) {

                    setFormError(
                        "Name is required"
                    );

                    return;
                }

                if (!houseNo.trim()) {

                    setFormError(
                        "House number required"
                    );

                    return;
                }

                if (!area.trim()) {

                    setFormError(
                        "Area is required"
                    );

                    return;
                }

                if (!city.trim()) {

                    setFormError(
                        "City is required"
                    );

                    return;
                }

                if (!stateName.trim()) {

                    setFormError(
                        "State is required"
                    );

                    return;
                }

                if (
                    !/^[0-9]{6}$/.test(
                        pincode
                    )
                ) {

                    setFormError(
                        "Pincode must be 6 digits"
                    );

                    return;
                }

                const request:
                    UserAddressRequest = {
                    name,
                    houseNo,
                    area,
                    landmark,
                    city,
                    state: stateName,
                    country,
                    pincode,
                    latitude: null,
                    longitude: null,
                };

                await updateAddress(request);

                // refresh address
                await fetchAddress();

                onClose();

            } catch (err) {

                console.error(err);
            }
        };

        return (

            <div
                className="address-backdrop"
                style={{
                    "--store-primary-color": primaryColor || "var(--primary-color)"
                } as React.CSSProperties}
                onClick={onClose}
            >

                <div
                    className="address-dialog"
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                >

                    {/* HEADER */}
                    <div className="dialog-header">

                        <h3>
                            Add / Edit Address
                        </h3>

                        <button onClick={onClose}>
                            ✖
                        </button>

                    </div>

                    {/* BODY */}
                    <div className="dialog-body">

                        <input
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            placeholder="House / Flat No"
                            value={houseNo}
                            onChange={(e) =>
                                setHouseNo(
                                    e.target.value
                                )
                            }
                        />

                        <textarea
                            placeholder="Area / Street"
                            rows={3}
                            value={area}
                            onChange={(e) =>
                                setArea(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            placeholder="Landmark"
                            value={landmark}
                            onChange={(e) =>
                                setLandmark(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            placeholder="City"
                            value={city}
                            onChange={(e) =>
                                setCity(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            placeholder="State"
                            value={stateName}
                            onChange={(e) =>
                                setStateName(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            placeholder="Country"
                            value={country}
                            onChange={(e) =>
                                setCountry(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            placeholder="Pincode"
                            value={pincode}
                            maxLength={6}
                            onChange={(e) => {

                                const value =
                                    e.target.value;

                                if (
                                    !/^\d*$/.test(
                                        value
                                    )
                                ) return;

                                setPincode(value);
                            }}
                        />

                        {/* ERROR */}
                        {(formError || error) && (

                            <div className="address-error">

                                {formError || error}

                            </div>
                        )}

                    </div>

                    {/* FOOTER */}
                    <div className="dialog-footer">

                        <button
                            className="cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="save"
                            onClick={handleSave}
                            disabled={loading}
                        >

                            {loading
                                ? "Saving..."
                                : "Save Address"}

                        </button>

                    </div>

                </div>

            </div>
        );
    };

export default AddressDialog;
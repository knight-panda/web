import { useEffect } from "react";
import "./PolicyPage.css";
import { usePublicStoreInfo } from "../../../hooks/user/usePublicStoreInfo";
import { useOutletContext } from "react-router-dom";

type OutletContextType = {
    storeId: string;
    store: any; // replace with proper type if available
};

const TermsPage = () => {
    const { storeId } = useOutletContext<OutletContextType>();

    const {
        fetchCarousel,
        data,
        loading,
        error
    } = usePublicStoreInfo();

    //    FETCH POLICY
    useEffect(() => {

        if (storeId) {

            fetchCarousel(storeId);
        }

    }, [storeId]);

    //    LOADING
    if (loading) {

        return (

            <div className="policy-page">

                <div className="policy-container">

                    <h2>
                        Loading...
                    </h2>

                </div>

            </div>
        );
    }

    /* =========================
       ERROR
    ========================= */

    if (error) {

        return (

            <div className="policy-page">

                <div className="policy-container">

                    <h2>
                        {error}
                    </h2>

                </div>

            </div>
        );
    }

    return (

        <div className="policy-page">

            <div className="policy-container">

                <h1>
                    Terms And Conditions
                </h1>

                <div className="policy-content">

                    {
                        data?.data?.termsAndConditions ||

                        "Privacy policy not available."
                    }

                </div>

            </div>

        </div>
    );
};

export default TermsPage ;
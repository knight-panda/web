import "./AddressDialog.css";

type AddressDialogProps = {
    onClose: () => void;
};

const AddressDialog: React.FC<AddressDialogProps> = ({ onClose }) => {
    return (
        <div className="address-backdrop" onClick={onClose}>
            <div
                className="address-dialog"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="dialog-header">
                    <h3>Add / Edit Address</h3>
                    <button onClick={onClose}>✖</button>
                </div>

                <div className="dialog-body">
                    <input placeholder="Full Name" />
                    <input placeholder="Phone Number" />
                    <input placeholder="House / Flat No" />
                    <input placeholder="City" />
                    <input placeholder="Pincode" />
                    <textarea
                        placeholder="Area / Street"
                        rows={3}
                    />
                </div>

                <div className="dialog-footer">
                    <button className="cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="save">Save Address</button>
                </div>
            </div>
        </div>
    );
};

export default AddressDialog;

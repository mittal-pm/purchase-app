import axios from 'axios';
import { useState } from 'react';

export default function CreateRequest({user}) {
  const [purchaseData, setPurchaseData] = useState({
    itemName: '',
    quantity: '',
    unitPrice: '',
    totalPrice: '',
    deliveryCharges: '',
    taxAmount: '',
    approverEmail: ''
  });

  const handleChange = (e) => {
    setPurchaseData({ ...purchaseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async() => {
    // Validation: Check if any field is empty
    const {
      itemName,
      quantity,
      unitPrice,
      totalPrice,
      deliveryCharges,
      taxAmount,
      approverEmail
    } = purchaseData;

    if (
      !itemName ||
      !quantity ||
      !unitPrice ||
      !totalPrice ||
      !deliveryCharges ||
      !taxAmount ||
      !approverEmail
    ) {
      alert('Please fill in all fields before submitting the form.');
      return;
    }

  try{
      purchaseData.createdBy = user.email
      const response = await axios.post("http://localhost:5002/create-purchase", purchaseData)
      alert(`${response.data.message}`)
  }catch(e){
      alert(e.message)
  }

  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Purchase Request</h1>
      <form className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={purchaseData.itemName}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={purchaseData.quantity}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="number"
          name="unitPrice"
          placeholder="Unit Price"
          value={purchaseData.unitPrice}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="number"
          name="totalPrice"
          placeholder="Total Price"
          value={purchaseData.totalPrice}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="number"
          name="deliveryCharges"
          placeholder="Delivery Charges"
          value={purchaseData.deliveryCharges}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="number"
          name="taxAmount"
          placeholder="Tax Amount"
          value={purchaseData.taxAmount}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="email"
          name="approverEmail"
          placeholder="Approver's Email"
          value={purchaseData.approverEmail}
          onChange={handleChange}
          className="border p-2 col-span-2"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 col-span-2">
          Submit Purchase Request
        </button>
      </form>
    </div>
  );
}

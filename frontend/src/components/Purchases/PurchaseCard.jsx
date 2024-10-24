import axios from 'axios';
import { useState } from 'react';

export default function PurchaseCard({ itemName, status, quantity, unitPrice, totalPrice, deliveryCharges, taxAmount, role, approverEmail }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleApprove = () => {
    axios.post(`http://localhost:5002/approve-purchase/${itemName}`, {status:'Approved', approverEmail: approverEmail }).then((response)=>{
        alert(`${response.data.message}`)
    }).catch((e)=>{
        alert(e.message)
    })
    console.log('Approved');
  };

  const handleReject = () => {
    axios.post(`http://localhost:5002/approve-purchase/${itemName}`, {status:'Rejected', approverEmail: approverEmail }).then((response)=>{
        alert(`${response.data.message}`)
    }).catch((e)=>{
        alert(e.message)
    })
    console.log('Rejected');
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-md">
      {/* Main Info: Item Name and Status/Actions */}
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleExpand}>
        <h3 className="text-xl font-bold">{itemName}</h3>
        {/* Conditional rendering based on role */}
        {role === 'Manager' && status === 'Pending'? (
          <div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleReject}
            >
              Reject
            </button>
          </div>
        ) : (
          <p className={`px-2 py-1 rounded ${status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status}
          </p>
        )}
      </div>

      {/* Expanded Section */}
      {isExpanded && (
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Quantity:</strong> {quantity}</p>
            <p><strong>Unit Price:</strong> ${unitPrice}</p>
            <p><strong>Total Price:</strong> ${totalPrice}</p>
            <p><strong>Delivery Charges:</strong> ${deliveryCharges}</p>
            <p><strong>Tax Amount:</strong> ${taxAmount}</p>
          </div>
        </div>
      )}

      {/* Expand/Collapse Button */}
      <button
        className="mt-4 text-blue-500 hover:underline"
        onClick={toggleExpand}
      >
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
    </div>
  );
}

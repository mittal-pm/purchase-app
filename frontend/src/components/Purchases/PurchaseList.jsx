import axios from 'axios';
import { useEffect, useState } from 'react';
import PurchaseCard from './PurchaseCard';

export default function PurchaseList({request}) {
  const [purchaseList, setPurchaseList] = useState([]);

  useEffect(() => {
    let requestBody = request
    axios.post("http://localhost:5002/get-purchase", requestBody).then((response)=>{
      setPurchaseList(response.data.purchases)
      console.log(response.data.purchases)
    }).catch((e)=>{console.log(e)})
   
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Purchase Requests</h1>
      <div>
      {purchaseList.map((list) => 
          request.createdBy ? (
            <PurchaseCard
              key={list._id}
              itemName={list.itemName}
              status={list.status}
              quantity={list.quantity}
              unitPrice={list.unitPrice}
              totalPrice={list.totalPrice}
              deliveryCharges={list.deliveryCharges}
              taxAmount={list.taxAmount}
              role = "General"
            />
          ) : (
            <PurchaseCard
              key={list._id}
              itemName={list.itemName}
              status={list.status}
              quantity={list.quantity}
              unitPrice={list.unitPrice}
              totalPrice={list.totalPrice}
              deliveryCharges={list.deliveryCharges}
              taxAmount={list.taxAmount}
              role = "Manager"
              approverEmail={request.approverEmail}
            />
          )
        )}
      </div>
    </div>
  );
}

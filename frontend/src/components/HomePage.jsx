import { AppBar } from "./AppBar";
import CreateRequest from "./Dashboard/CreateRequest";
import PurchaseList from "./Purchases/PurchaseList";
import { useState } from 'react';

export function HomePage({user, setUser}){
    const [activeComponent, setActiveComponent] = useState('create');
    const fetchBody = {
        createdBy: user.email
    }
    const approvalBody = {
        approverEmail: user.email
    }
    return <div>

        <div>
            <AppBar user={user} setUser={setUser}></AppBar>
        </div>

        
        <div className="grid grid-cols-4 ">
   
            <div className="col-span-1 p-4 ">
                <ul className="p-4">
                    <li
                        className={`cursor-pointer p-4 hover:bg-gray-100 ${
                        activeComponent === 'create' ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => setActiveComponent('create')}
                    >
                        Create a New Request
                    </li>
                    <li
                        className={`cursor-pointer p-4 hover:bg-gray-100 ${
                        activeComponent === 'all' ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => setActiveComponent('all')}
                    >
                        My Requests
                    </li>
                     {/* Additional option for Manager role */}
                    {user.role === 'Manager' && (
                            <li
                                className={`cursor-pointer p-4 hover:bg-gray-100 ${
                                activeComponent === 'approval' ? 'bg-gray-100' : ''
                                }`}
                                onClick={() => setActiveComponent('approval')}
                            >
                                Requests Needing My Approval
                            </li>
                        )}
                </ul>
            </div>

            <div className="col-span-3 p-4">
                {activeComponent === 'create' && <CreateRequest user={user} />}
                { activeComponent === 'all' && <PurchaseList request={fetchBody}  />}
                {user.role === 'Manager' && activeComponent === 'approval' && <PurchaseList request={approvalBody}  />}
            </div>
        </div>
    </div>
}
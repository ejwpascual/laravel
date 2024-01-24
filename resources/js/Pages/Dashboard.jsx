import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FundingForm from '@/Sections/FundingForm';


export default function Dashboard({ auth, customer }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-2xl">
                            <h1>Hi, <b>{customer.name}. </b></h1>
                        </div>
                        <div className="p-6 text-gray-900 text-2xl">
                            <h1>
                                Account Balance:  
                                <b> ${customer.balance}</b>
                            </h1>
                            
                        </div>
                        <FundingForm/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

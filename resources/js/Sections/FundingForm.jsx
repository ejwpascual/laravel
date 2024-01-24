import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import CurrencyInput from 'react-currency-input-field';

export default function FundingForm({ auth, customer }) {
    const { data, setData, getValues, post, processing, errors, reset } = useForm({
        amount: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('dashboard.fund'), {
            preserveScroll: true,
            onSuccess: () => reset('amount'),
        });
    };
    return (
        <form onSubmit={submit} className="p-6 text-gray-900">
            <p className="text-gray-900 font-semibold text-lg mb-4">
                Add funds to this customer’s cash balance. This simulates a bank transfer into their balance that can be used for testmode payments or invoices.
            </p>

            <InputLabel htmlFor="amount" value="Amount" />
            <CurrencyInput
                decimalsLimit={2}
                id="amount"
                value={ data.amount }
                name="amount"
                placeholder="$0.00"
                prefix={'$'}
                onValueChange={(value, name) => setData(name, value)}
            />
            <PrimaryButton className="ms-4" disabled={processing}>
                Add Funds
            </PrimaryButton>
        </form>
    );
}

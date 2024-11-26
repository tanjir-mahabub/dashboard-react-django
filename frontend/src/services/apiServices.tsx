import { ShoppingCartIcon, GiftIcon, CurrencyDollarIcon, TruckIcon } from '@heroicons/react/outline';
export interface Metric {
    title: string;
    value: string;
    icon: React.ReactNode
}

export const fetchMetrics = async (): Promise<Metric[]> => {
    // Simulate an API call with a delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { title: 'Total Credit', value: '$10,000', icon: <CurrencyDollarIcon className="h-10 w-10 text-green-500" /> },
                { title: 'Checkout Amount', value: '$4,500', icon: <ShoppingCartIcon className="h-10 w-10 text-purple-500" /> },
                { title: 'Gift Available', value: '5', icon: <GiftIcon className="h-10 w-10 text-accent" /> },
                { title: 'Pending Deliveries', value: '12', icon: <TruckIcon className="h-10 w-10 text-warning" /> },
            ]);
        }, 1000); // Simulates 1-second delay
    });
};



export const fetchCartData = async () => {
    return [
        { id: 1, name: 'Apple', price: 1.99, quantity: 3 },
        { id: 2, name: 'Orange', price: 0.99, quantity: 5 },
        { id: 3, name: 'Banana', price: 0.49, quantity: 7 },
    ];
};

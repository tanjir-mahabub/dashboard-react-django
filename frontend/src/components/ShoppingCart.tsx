import React, { useEffect, useState } from 'react';
import { CartItem, fetchCartData } from '../services/apiServices';
import useTheme from '../hooks/useTheme';
import LoadingCard from './LoadingCard';
import ErrorCard from './ErrorCard';

const ShoppingCart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    useEffect(() => {
        const loadCartData = async () => {
            try {
                const data = await fetchCartData();
                setCartItems(data);
            } catch (err) {
                console.error(err);
                setError('Unable to load shopping cart data.');
            } finally {
                setLoading(false);
            }
        };

        loadCartData();
    }, []);

    if (error) {
        return <ErrorCard title="Shopping Cart" message={error} />;
    }

    if (loading) {
        return <LoadingCard title="Shopping Cart" />;
    }

    return (
        <div className={`card-base ${isDarkMode ? 'card-dark' : 'card-light'}`}>
            <h2 className="text-lg font-semibold text-dark dark:text-light pb-4">Shopping Cart</h2>
            <ul className="space-y-2">
                {cartItems?.map((item) => (
                    <li key={item.id} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>
                            {item.quantity} x ${Number(item.price).toFixed(2)}
                        </span>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingCart;

import React from 'react';
import * as HeroIcons from '@heroicons/react/outline'; // Import all Heroicons
import { QuestionMarkCircleIcon } from '@heroicons/react/outline'; // Default icon
import useTheme from '../hooks/useTheme';
import LoadingCard from './LoadingCard';

interface CardProps {
    title?: string;
    value?: string;
    icon?: string; // Accepts icon name as a string
    loading?: boolean;
    loadingType?: 'pulse' | 'spinner';
}

// Predefined mapping of Heroicons with colors
const iconMap: Record<
    string,
    { icon: React.FC<React.SVGProps<SVGSVGElement>>; color: string }
> = {
    CurrencyDollarIcon: { icon: HeroIcons.CurrencyDollarIcon, color: 'text-green-500' },
    ShoppingCartIcon: { icon: HeroIcons.ShoppingCartIcon, color: 'text-blue-500' },
    GiftIcon: { icon: HeroIcons.GiftIcon, color: 'text-purple-500' },
    TruckIcon: { icon: HeroIcons.TruckIcon, color: 'text-yellow-500' },
};

const Card: React.FC<CardProps> = ({ title, value, icon, loading = false, loadingType = 'pulse' }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    if (loading) return <LoadingCard title={title || 'Loading...'} loadingType={loadingType} />;

    // Get the matched icon component and color or fallback to default icon and color
    const IconComponent = icon && iconMap[icon] ? iconMap[icon].icon : QuestionMarkCircleIcon;
    const iconColor = icon && iconMap[icon] ? iconMap[icon].color : 'text-gray-500';

    return (
        <div className={`small-card-base ${isDarkMode ? 'card-dark' : 'card-light'}`}>
            <div className='space-y-2'>
                <h2 className="text-base sm:text-lg font-bold">{title}</h2>
                <p className="text-base sm:text-2xl font-bold">{value}</p>
            </div>
            <div>
                {/* Render the matched icon with dynamic color */}
                <IconComponent className={`h-9 w-9 ${iconColor}`} />
            </div>
        </div>
    );
};

export default Card;

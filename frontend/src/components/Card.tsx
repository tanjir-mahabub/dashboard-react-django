import React from "react";

type CardProps = {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
    return (
        <div className="bg-dark text-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <div className="text-primary">{icon}</div>
            <div>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-xl font-bold mt-2">{value}</p>
            </div>
        </div>
    );
};

export default Card;

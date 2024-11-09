"use client";
import React, { useState } from 'react';

const Notify: React.FC = () => {
    const [isListVisible, setIsListVisible] = useState(false);

    const handleIconClick = () => {
        setIsListVisible(!isListVisible);
    };

    return (
        <div>
            <span onClick={handleIconClick}>🔔</span>
            {isListVisible && (
                <ul>
                    <li>Notification 1</li>
                    <li>Notification 2</li>
                    <li>Notification 3</li>
                </ul>
            )}
        </div>
    );
};

export default Notify;
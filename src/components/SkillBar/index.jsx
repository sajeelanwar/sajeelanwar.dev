import React from 'react';
import { motion } from 'framer-motion';

const index = ({ name, level, color, delay }) => {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="font-medium">{name}</span>
                <span className="text-gray-400">{level}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    transition={{ duration: 1, delay, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className={`h-full bg-gradient-to-r ${color} rounded-full`}
                />
            </div>
        </div>
    );
};

export default index;
import { useEffect, useState } from 'react';

const useIsOverflow = () => {
    const [isOverflow, setIsOverflow] = useState(undefined);

    useEffect(() => {
        const handleResize = () => {
            setIsOverflow(document.documentElement.scrollHeight > document.documentElement.clientHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });
    return isOverflow;
};

export default useIsOverflow;
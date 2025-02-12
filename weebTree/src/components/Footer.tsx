import React from 'react';

interface FooterProps {
    cnt: number;
    setCnt: React.Dispatch<React.SetStateAction<number>>;
}

const Footer: React.FC<FooterProps> = ({ cnt, setCnt }) => {
    return (
        <>
        <div className="w-full bg-zinc-900 p-4 sticky bottom-0 flex justify-center"><button
            className="p-3 m-3 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors duration-300"
            onClick={() => setCnt(cnt + 1)}
        >
            {cnt}
        </button>
        </div>
        </>
    );
}

export default Footer;
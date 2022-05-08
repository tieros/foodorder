import { useState } from 'react';

export default function CancelButton(props) {
    const [hover, setHover] = useState(null);

    let cancelIcon = (
        <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='45' height='45' viewBox='0 0 45 45' style={{ fill: '#000000' }}>
            <path fill='#de451f' d='M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z'></path>
            <path fill='#fff' d='M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z'></path>
            <path fill='#fff' d='M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z'></path>
        </svg>
    );

    if (hover) {
        cancelIcon = (
            <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='50' height='50' viewBox='0 0 170 170' style={{ fill: '#000000' }}>
                <g transform='translate(9.288,9.288) scale(0.892,0.892)'>
                    <g fill='none' fillRule='nonzero' stroke='none' strokeWidth='none' strokeLinecap='butt' strokeLinejoin='none' strokeMiterlimit='10' strokeDasharray='' strokeDashoffset='0' fontFamily='none' fontWeight='none' fontSize='none' textAnchor='none' style={{ mixBlendMode: 'normal' }}>
                        <g stroke='#cccccc' strokeWidth='30' strokeLinejoin='round'>
                            <path d='M157.66667,86c0,39.57792 -32.08875,71.66667 -71.66667,71.66667c-39.57792,0 -71.66667,-32.08875 -71.66667,-71.66667c0,-39.57792 32.08875,-71.66667 71.66667,-71.66667c39.57792,0 71.66667,32.08875 71.66667,71.66667z' fill='#de451f'></path>
                            <path d='M106.26733,55.599l10.13367,10.13367l-50.66833,50.66833l-10.13367,-10.13367z' fill='#ffffff'></path>
                            <path d='M116.401,106.26733l-10.13367,10.13367l-50.66833,-50.66833l10.13367,-10.13367z' fill='#ffffff'></path>
                        </g>
                        <path d='M0,172v-172h172v172z' fill='none' stroke='none' strokeWidth='1' strokeLinejoin='miter'></path>
                        <g stroke='none' strokeWidth='1' strokeLinejoin='miter'>
                            <path d='M157.66667,86c0,39.57792 -32.08875,71.66667 -71.66667,71.66667c-39.57792,0 -71.66667,-32.08875 -71.66667,-71.66667c0,-39.57792 32.08875,-71.66667 71.66667,-71.66667c39.57792,0 71.66667,32.08875 71.66667,71.66667z' fill='#de451f'></path>
                            <path d='M106.26733,55.599l10.13367,10.13367l-50.66833,50.66833l-10.13367,-10.13367z' fill='#ffffff'></path>
                            <path d='M116.401,106.26733l-10.13367,10.13367l-50.66833,-50.66833l10.13367,-10.13367z' fill='#ffffff'></path>
                        </g>
                        <path d='' fill='none' stroke='none' strokeWidth='1' strokeLinejoin='miter'></path>
                    </g>
                </g>
            </svg>
        );
    }
    return (
        <button onClick={props.onClick} className={props.className} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {cancelIcon}
        </button>
    );
}

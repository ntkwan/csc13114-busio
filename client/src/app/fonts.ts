import { Cabin } from 'next/font/google';
import { Ranchers } from 'next/font/google';

export const cabin = Cabin({
    variable: '--font-cabin',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

export const ranchers = Ranchers({
    variable: '--font-ranchers',
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
});

export const fontsVariables: string[] = [cabin.variable, ranchers.variable];

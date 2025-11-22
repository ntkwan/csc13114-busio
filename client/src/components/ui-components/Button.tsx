import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'standard' | 'compact' | 'outline' | 'cta';
    size?: 'small' | 'medium' | 'large' | 'xl';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    children: React.ReactNode;
    className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'standard',
            size = 'large',
            icon,
            iconPosition = 'left',
            children,
            className,
            disabled,
            ...props
        },
        ref,
    ) => {
        const baseStyles =
            'inline-flex items-center justify-center font-cabin transition-all duration-200 ' +
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 ' +
            'disabled:opacity-50 disabled:cursor-not-allowed';

        const variantStyles = {
            standard: {
                large: 'h-[55px] bg-primary02 hover:bg-primary01 text-white border-0 rounded-lg text-lg font-bold px-5 py-3',
                medium: 'h-[45px] bg-primary02 hover:bg-primary01 text-white border-0 rounded-lg text-md font-bold px-4 py-2',
                small: 'h-[35px] bg-primary02 hover:bg-primary01 text-white border-0 rounded-lg text-sm font-bold px-3 py-2',
            },
            compact: {
                large: 'h-[55px] bg-primary02 hover:bg-primary01 text-white border-0 rounded-lg text-lg font-bold px-4 py-3',
                medium: 'h-[45px] bg-primary02 hover:bg-primary01 text-white border-0 rounded-lg text-sm font-bold px-4 py-2',
                small: 'h-[30px] bg-primary02 hover:bg-primary01 text-white border-0 rounded-lg text-sm font-bold px-3 py-2',
            },
            outline: {
                xl: 'h-[55px] bg-white hover:bg-primary01 text-primary02 hover:text-white border border-primary02 hover:border-primary02 rounded-lg text-lg font-bold px-5 py-3',
                large: 'h-[35px] bg-white hover:bg-primary01 text-primary02 hover:text-white border border-primary02 hover:border-primary02 rounded-lg text-sm font-bold px-4 py-1',
                medium: 'h-[35px] bg-primary02 hover:bg-white text-white hover:text-primary02 border border-primary02 hover:border-primary02 rounded-lg text-sm font-bold px-4 py-1',
                small: 'h-[25px] bg-white hover:bg-primary01 text-primary02 hover:text-white border border-primary02 hover:border-primary02 rounded-lg text-sm font-bold px-2 py-1',
            },
            cta: {
                large: 'h-[91px] bg-primary02 hover:bg-primary01 text-white border-0 rounded-lg text-xl font-bold px-8 py-4',
                medium: 'h-[70px] bg-primary02 hover:bg-primary01 text-white border-0 rounded-lg text-lg font-bold px-6 py-3',
                small: 'h-[55px] bg-primary02 hover:bg-primary01 text-white border-0 rounded-lg text-lg font-bold px-5 py-3',
            },
        } as const;

        let buttonStyles: string;
        switch (variant) {
            case 'outline':
                buttonStyles =
                    variantStyles.outline[size as keyof typeof variantStyles.outline] ||
                    variantStyles.outline.large;
                break;
            case 'cta':
                buttonStyles =
                    variantStyles.cta[size as keyof typeof variantStyles.cta] ||
                    variantStyles.cta.large;
                break;
            case 'compact':
                buttonStyles =
                    variantStyles.compact[size as keyof typeof variantStyles.compact] ||
                    variantStyles.compact.large;
                break;
            case 'standard':
            default:
                buttonStyles =
                    variantStyles.standard[size as keyof typeof variantStyles.standard] ||
                    variantStyles.standard.large;
                break;
        }

        return (
            <button
                ref={ref}
                className={cn(baseStyles, buttonStyles, className)}
                disabled={disabled}
                {...props}
            >
                {icon && iconPosition === 'left' && (
                    <span className="mr-2 flex items-center">{icon}</span>
                )}
                <span className="flex items-center">{children}</span>
                {icon && iconPosition === 'right' && (
                    <span className="ml-2 flex items-center">{icon}</span>
                )}
            </button>
        );
    },
);

Button.displayName = 'Button';

export default Button;

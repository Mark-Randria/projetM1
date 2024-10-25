

import React from 'react'
import { Button } from '@mantine/core'


type CustomButtonProps={
    onClick?: VoidFunction;
    type?: "button" | "submit" | "reset";
    disabled?:boolean;
    text:string;
    leftSection?:any;
    rightSection?:any;
    size?:"md"|"lg"|"xl"
    variant:"filled"|"light"|"transparent"
    className?:string
    
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
    const{
        onClick,
        leftSection,
        rightSection,
        text,
        size="xl",
        variant="filled",
        className,
        type,
        disabled
    } =props

    return <Button 
                leftSection={leftSection}
                rightSection={rightSection} 
                onClick={onClick}
                size={size}
                radius="lg"
                color='teal'
                variant={variant}
                className={className}
                type={type}
                disabled={disabled}
            >
            {text}</Button>
}

CustomButton.displayName = 'Button component'

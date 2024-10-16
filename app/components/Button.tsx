import React from 'react'
import { Button } from '@mantine/core'


type CustomButtonProps={
    onClick: VoidFunction;
    text:string;
    leftSection?:any;
    rightSection?:any;
    size?:"md"|"lg"|"xl"
    //variant:"filled"|"light"|"transparent"
    
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
    const{
        onClick,
        leftSection,
        rightSection,
        text,
        size="xl",
        //variant="filled"

    } =props

    return <Button 
                leftSection={leftSection}
                rightSection={rightSection} 
                onClick={onClick}
                size={size}
                radius="lg"
                color='teal'
                variant="filled"
            >
            {text}</Button>
}

CustomButton.displayName = 'Button component'

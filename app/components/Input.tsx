import { TextInput } from "@mantine/core";
import { HTMLInputTypeAttribute, useState } from "react";


type CustomInputProps={
    type?:string,
    placeholder:string;
    label?: string;
    
}& React.InputHTMLAttributes<HTMLInputTypeAttribute>

export const CustomInput: React.FC<CustomInputProps> = (props) => {
    const{placeholder,label,type, ...inputProps}=props;

   
    return (
        <TextInput
        classNames={{
          input:" focus:border-teal-500 focus:border-2 outline-none",
          root:"w-full"
        }}
        type={type}
        radius="md"
        size="md"
        placeholder={placeholder}
        label={label}
        />
      
      );

}
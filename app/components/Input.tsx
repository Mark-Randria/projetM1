import { TextInput } from "@mantine/core";
import { HTMLInputTypeAttribute, useState } from "react";


type CustomInputProps={
    placeholder:string;
    label?: string;
    
}

export const CustomInput: React.FC<CustomInputProps> = (props) => {
    const{placeholder,label}=props;

   
    return (
        <TextInput
        classNames={{
          input:" focus:border-teal-500 focus:border-2 outline-none",
          root:"w-full"
        }}
        radius="md"
        size="md"
        placeholder={placeholder}
        label={label}
        />
      
      );

}
import { HTMLInputTypeAttribute, useState } from "react";


type CustomInputProps={
    placeholder:string;
    label?:string;
    id?:string;
    type?: HTMLInputTypeAttribute;
    className?: string;
}

export const CustomInput: React.FC<CustomInputProps> = (props) => {
    const{placeholder, label, id, type}=props;

    const [definedType, setDefinedType] = useState<HTMLInputTypeAttribute>(type || "text");
    return (

      <div className="flex flex-col gap-1 w-full ">
         {label && (
            <label htmlFor={id} className="text-black ">
          {label}
        </label>
      )}
        <div className="flex flex-col">
          <input placeholder={placeholder} type={definedType} className="border-gray-400 py-2 px-2  bg-white border-2 rounded-lg focus:border-teal-500 outline-none" />
          {
            type === "password" ? (
              <button onClick={() => setDefinedType(definedType === "password" ? "text" : "password")}>
                {definedType === "password" ? "Montrer mot de passe" : "Cacher mot de passer"}
              </button>
            ) : (
              null
            )
          }
        </div>
      </div>
      );

}
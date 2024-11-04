


type CustomTextAreaProps={
    placeholder:string;
    label?:string;
    id?:string;
    className?: string;
}

export const CustomTextArea: React.FC<CustomTextAreaProps> = (props) => {
    const{placeholder, label, id}=props;

   
    return (

      <div className="flex flex-col gap-1 w-full ">
         {label && (
            <label htmlFor={id} className="text-black ">
          {label}
        </label>
      )}
        <div className="flex flex-col">
          <textarea placeholder={placeholder}  className="border-gray-400 py-2 px-2  bg-white border-2 rounded-lg focus:border-teal-500 outline-none" />
        </div>
      </div>
      );

}
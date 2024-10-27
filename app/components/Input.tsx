import { TextInput, PasswordInput } from "@mantine/core";

export const CustomInput: React.FC<any> = ({ ...props }) => {
  return (
    <TextInput
      classNames={{
        input: " focus:border-teal-500 focus:border-2 outline-none",
        root: "w-full",
      }}
      {...props}
    />
  );
};

export const CustomPasswordInput: React.FC<any> = ({ ...props }) => {
  return (
    <PasswordInput
      classNames={{
        input: " focus:border-teal-500 focus:border-2 outline-none",
        root: "w-full",
      }}
      {...props}
    />
  );
};

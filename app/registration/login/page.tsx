"use client";

import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import { Paper, Button, Container, PasswordInput, TextInput, Stack, } from "@mantine/core";
import useLoginUser from "@/app/hooks/auth/useLoginUser";
import { CustomInput } from "@/app/components/Input";
import { CustomButton } from "@/app/components/Button";

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const form = useForm<IFormInput>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "email invalide"),
      password: (value) => (value.length >= 8 ? null : "Mot de passe invalide"),
    },
  });

  const loginTriggered = () => {};
  const { mutate: login, isPending } = useLoginUser(loginTriggered);

  const handleSubmit = (values: IFormInput) => {
    const { email, password } = values;
    login(
      { email, password },
      {
        onSuccess(data) {
          console.log(data);
        },
        onSettled() {},
        onError() {},
      }
    );
  };
  return (
  <Container>
    <Paper shadow="sm" radius="md" className="px-6 py-8">
      <div className="flex w-full">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Stack>
                <CustomInput placeholder="Email" label="Email"/>
                <CustomInput placeholder="Mot de passe" label="Mot de passe"/>
              </Stack>
              <CustomButton text={isPending ? ("Please wait...") : ("Login")} disabled={isPending} type="submit" variant="filled" className="w-3/4"/>
              <Button classNames={{root:"w-80"}} onClick={() => form.reset()}>Reset</Button>
          </form>
          <div className="image">
            
          </div>
      </div>
    </Paper>
  </Container>
  );
}



{/* <TextInput
            classNames={{
              label: "bg-red-100",
              input:"focus:border-red-700 focus:border-2 outline-none"
            }}
            withAsterisk
            label="email"
            placeholder="JohnDoe@email.com"
            {...form.getInputProps("email")}
          /> */}
          {/* <PasswordInput
            classNames={{
              label: "bg-blue-100",
            }}
            withAsterisk
            label="Mot de passe"
            {...form.getInputProps("password")}
          /> */}

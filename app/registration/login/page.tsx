"use client";

import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, TextInput } from "@mantine/core";
import useLoginUser from "@/app/hooks/auth/useLoginUser";

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const form = useForm<IFormInput>({
    mode: "controlled",
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
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Container size="sm h-fit">
        <Box
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <TextInput
            classNames={{
              label: "bg-red-100",
            }}
            withAsterisk
            label="email"
            placeholder="JohnDoe@email.com"
            {...form.getInputProps("email")}
          />
          <TextInput
            classNames={{
              label: "bg-blue-100",
            }}
            withAsterisk
            label="Mot de passe"
            // type="password"
            {...form.getInputProps("password")}
          />
          <Button className="btn btn-primary" type="submit">
            Login
          </Button>
          <Button onClick={() => form.reset()}>Reset</Button>
        </Box>
      </Container>
    </form>
  );
}

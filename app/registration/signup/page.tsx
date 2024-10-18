"use client";

import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, TextInput } from "@mantine/core";
import useSignupUser from "@/app/hooks/auth/useSignupUser";

interface IFormInput {
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

export default function Signup() {
  const form = useForm<IFormInput>({
    mode: "controlled",
    initialValues: {
      nom: "",
      prenom: "",
      email: "",
      password: "",
    },

    validate: {
      nom: (value) => (value.length > 1 ? null : "Nom trop court"),
      prenom: (value) => (value.length > 1 ? null : "Prenom trop court"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "email invalide"),
      password: (value) => (value.length >= 8 ? null : "Mot de passe invalide"),
    },
  });

  const signupTriggered = () => {};
  const { mutate: signup, isPending } = useSignupUser(signupTriggered);

  const handleSubmit = (values: IFormInput) => {
    const { nom, prenom, email, password } = values;
    signup(
      { nom, prenom, email, password },
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
            label="Nom"
            {...form.getInputProps("nom")}
          />
          <TextInput
            classNames={{
              label: "bg-red-100",
            }}
            withAsterisk
            label="Prenom"
            {...form.getInputProps("prenom")}
          />
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
            type="password"
            {...form.getInputProps("password")}
          />
          <Button className="btn btn-primary" type="submit">
            Signup
          </Button>
          <Button onClick={() => form.reset()}>Reset</Button>
        </Box>
      </Container>
    </form>
  );
}

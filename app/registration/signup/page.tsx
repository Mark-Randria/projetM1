"use client";

import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput, Text
} from "@mantine/core";
import useSignupUser from "@/app/hooks/auth/useSignupUser";
import { CustomButton } from "@/app/components/Button";
import { CustomInput } from "@/app/components/Input";
import { headImage } from "@/app/constants/images";

interface IFormInput {
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

export default function Signup() {
  const form = useForm<IFormInput>({
    mode: "uncontrolled",
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
   <>
     {/* <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
          <PasswordInput
            classNames={{
              label: "bg-blue-100",
            }}
            withAsterisk
            label="Mot de passe"
            type="password"
            {...form.getInputProps("password")}
          />
          <Button
            className="btn btn-primary"
            type="submit"
            disabled={isPending}
          >
            Signup
          </Button>
          <Button onClick={() => form.reset()}>Reset</Button>
        </Box>
      </Container>
    </form> */}
    <Container className="pt-8">
    <Paper shadow="sm" radius="md" withBorder className="">
      <div className="flex gap-2 w-full ">
          <div className=" relative border-2  w-3/5">
            <Image src={headImage} alt="head" className="object-cover"/>
            <div className="absolute inset-0 bg-teal-400 opacity-30 filter " /> 
          </div>
          <div className=" flex flex-col w-2/5 px-4 mt-8">
            <Text
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: 'green', to: 'teal', deg: 90 }}
             >
              Créer un compte e-Science
            </Text>
            <form className="flex flex-col gap-5 mt-8 items-center" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Stack className="w-full">
                <CustomInput  placeholder="Nom" label="Nom"/>
                <CustomInput placeholder="Prenom" label="Prenom"/>
                <CustomInput placeholder="Email" label="Email"   {...form.getInputProps("email")}/>
                {/* <CustomInput placeholder="Mot de passe" label="Mot de passe"/> */}
                <PasswordInput
                    classNames={{
                      input:"",
                      root:"  w-full"
                    }}
                    withAsterisk
                    label="Mot de passe"
                    type="password"
                    {...form.getInputProps("password")}
                  />
              </Stack>
              <div className=" flex flex-col gap-1 w-1/2 ">
                <CustomButton text={isPending ? ("Please wait...") : ("S'inscrire")} disabled={isPending} type="submit" variant="filled" size='lg'  />
              </div>
          </form>
          </div>
      </div>
    </Paper>
  </Container>
    
   </>
  );
}

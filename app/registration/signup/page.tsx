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
  TextInput,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import useSignupUser from "@/app/hooks/auth/useSignupUser";
import { CustomButton } from "@/app/components/Button";
import { CustomInput, CustomPasswordInput } from "@/app/components/Input";
import { headImage } from "@/app/constants/images";
import { useRouter } from "next/navigation";

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
  const {
    mutate: signup,
    isPending,
    isSuccess,
  } = useSignupUser(signupTriggered);

  const router = useRouter();

  const handleSubmit = (values: IFormInput) => {
    console.log("CLicked");
    const { nom, prenom, email, password } = values;
    signup(
      { nom, prenom, email, password },
      {
        onSuccess(data) {
          console.log(data);
          router.push("/dashboard");
        },
        onSettled() {},
        onError(err) {
          console.log(err);
        },
      }
    );
  };
  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <LoadingOverlay
          visible={isSuccess}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Container className="pt-8">
          <Paper shadow="sm" radius="md" withBorder className="">
            <div className="flex gap-2 w-full ">
              <div className=" relative border-2  w-3/5">
                <Image src={headImage} alt="head" className="object-cover" />
                <div className="absolute inset-0 bg-teal-400 opacity-30 filter " />
              </div>
              <div className=" flex flex-col w-2/5 px-4 mt-8">
                <Text
                  size="xl"
                  fw={900}
                  variant="gradient"
                  gradient={{ from: "green", to: "teal", deg: 90 }}
                >
                  Créer un compte e-Science
                </Text>
                <div className="flex flex-col gap-5 mt-8 items-center">
                  <Stack className="w-full">
                    <CustomInput
                      placeholder="Nom"
                      label="Nom"
                      {...form.getInputProps("nom")}
                    />
                    <CustomInput
                      placeholder="Prenom"
                      label="Prenom"
                      {...form.getInputProps("prenom")}
                    />
                    <CustomInput
                      placeholder="Email"
                      label="Email"
                      {...form.getInputProps("email")}
                    />
                    <CustomPasswordInput
                      withAsterisk
                      label="Mot de passe"
                      type="password"
                      {...form.getInputProps("password")}
                    />
                  </Stack>
                  <div className=" flex flex-col gap-1 w-1/2 ">
                    <CustomButton
                      disabled={isPending}
                      type="submit"
                      variant="filled"
                      size="lg"
                    >
                      {isPending ? "Please wait..." : "S'inscrire"}
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        </Container>
      </form>
    </>
  );
}

import { Button, rem, Title } from "@mantine/core";
import React from "react";
import { IconLogout } from "@tabler/icons-react";
import { logoutSession } from "../../lib/sessionManagement";
import { redirect } from "next/navigation";

const Header = ({  text, children }: any) => {
  const icon = (
    <IconLogout style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  return (
    <div className="flex pt-4 justify-between items-center mb-2">
      <Title order={2}>{text}</Title>
      <div>{children}</div>
      <form
        action={async () => {
          "use server";
          await logoutSession();
          redirect("/registration/login");
        }}
      >
        <Button
          rightSection={icon}
          radius="lg"
          size="md"
          color="dark"
          type="submit"
        >
          Se deconnecter
        </Button>
      </form>
    </div>
  );
};

export default Header;

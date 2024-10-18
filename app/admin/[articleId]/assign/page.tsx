"use client";

import { Button } from "@mantine/core";
import useAssignReviewer from "@/app/hooks/useAssignReviewer";
import useGetUser from "@/app/hooks/useGetUser";

interface IProps {
  params: { articleId: number };
}

export default function AssignPage({ params: { articleId } }: IProps) {
  const { data: userList, isLoading, isError } = useGetUser();
  console.log(userList);
  const onSuccessCallback = () => {};

  const { mutate: assign } = useAssignReviewer(() => onSuccessCallback);

  const handleAssignReviewer = () => {
    assign(
      {
        articleId: "1", // Article ID
        reviewerData: { reviewerId: 5 }, // Data to post (e.g., reviewer ID)
      },
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
    <div>
      Assigning Page {articleId}
      <Button onClick={handleAssignReviewer}>Assign user</Button>
    </div>
  );
}

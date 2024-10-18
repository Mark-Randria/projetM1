"use client";

import useAssignReviewer from "@/app/hooks/useAssignReviewer";
import { Button } from "@mantine/core";

export default function AssignPage() {
  const onSuccessCallback = () => {};

  const { mutate: assign } = useAssignReviewer(onSuccessCallback);

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
      Assign
      <Button onClick={handleAssignReviewer}>Assign user</Button>
    </div>
  );
}

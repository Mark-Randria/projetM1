"use client";

import { Box, Button, LoadingOverlay, Select } from "@mantine/core";
import useAssignReviewer from "@/app/hooks/adminArticleAction/useAssignReviewer";
import useGetUser from "@/app/hooks/useGetUser";
import useGetAssignedReviewers from "@/app/hooks/useGetAssignedReviewers";
import { useState } from "react";

interface IProps {
  params: { articleId: number };
}

export default function AssignPage({ params: { articleId } }: IProps) {
  const [selectedReviewer, setSelectedReviewer] = useState<string | null>("");

  const {
    data: reviewerList,
    isLoading: reviewerIsLoading,
    isError: reviewerIsError,
  } = useGetAssignedReviewers(articleId.toString());

  const { data: userList, isLoading, isError } = useGetUser();

  const onSuccessCallback = () => {};
  const { mutate: assign, isPending } = useAssignReviewer(
    () => onSuccessCallback
  );

  const handleAssignReviewer = () => {
    assign(
      {
        articleId: articleId.toString(),
        reviewerData: { reviewerId: selectedUser!.id },
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

  const availableReviewer = userList?.filter(
    (user) =>
      !reviewerList?.some(
        (reviewer) => reviewer.email === user.email || user.isAdmin
      )
  );

  const selectedUser = userList?.find(
    (user) => `${user.nom} ${user.prenom}` === selectedReviewer
  );

  const selectData = availableReviewer?.map(
    (reviewer) => `${reviewer.nom} ${reviewer.prenom}`
  );

  if (reviewerIsLoading && isLoading)
    return (
      <LoadingOverlay
        visible
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    );
  console.log(selectedUser?.id);
  return (
    <div>
      Assigning Page {articleId}
      <Box>
        <Select
          label="Reviewer name"
          placeholder="select a reviewer"
          data={selectData || []}
          value={selectedReviewer}
          onChange={setSelectedReviewer}
        />
      </Box>
      <Button
        disabled={selectedReviewer === "" || isPending}
        onClick={handleAssignReviewer}
      >
        {isPending ? "Loading..." : "Assign"}
      </Button>
    </div>
  );
}

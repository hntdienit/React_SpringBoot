import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import { useSelector } from "react-redux";

import bookableFormState from "../../Helpers/FormState/bookable.jsx";
import { createItem } from "../../utils/api";

import BookableForm from "../../components/Bookables/Form.jsx";
import PageSpinner from "../../components/Spinner";

export default function BookableNew() {
  const [roleAdmin, setRoleAdmin] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const formState = bookableFormState();
  const queryClient = useQueryClient();

  const {
    mutate: createBookable,
    status,
    error,
  } = useMutation((item) => createItem("http://localhost:8080/bookables", item), {
    onSuccess: (bookable) => {
      queryClient.setQueryData("bookables", (old) => [...(old || []), bookable]);

      navigate(`/bookables/${bookable.id}`);
    },
  });

  useEffect(() => {
    if (currentUser) {
      currentUser.roles.map((role) => {
        // console.log(role)
        if (role === "ROLE_ADMIN") 
        setRoleAdmin(true);
        // console.log("asddas",role)
      });
    }
  }, [currentUser]);

  function handleSubmit() {
    createBookable(formState.state);
  }

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  if (status === "loading") {
    return <PageSpinner />;
  }

  // if (!currentUser) {
  //   return <Navigate to="/" />;
  // }

  // if (!roleAdmin) {
  //   return <Navigate to="/error111" />;
  // }

  return <BookableForm formState={formState} handleSubmit={handleSubmit} roleAdmin={roleAdmin} />;
}

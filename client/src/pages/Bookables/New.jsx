import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import { useSelector } from "react-redux";

import bookableFormState from "../../Helpers/FormState/bookable.jsx";
import { createItem } from "../../utils/api";

import BookableForm from "../../components/Bookables/Form.jsx";
import PageSpinner from "../../components/Spinner";
import { toast } from 'react-toastify';

export default function BookableNew() {
  const [roleAdmin, setRoleAdmin] = useState(false);
  const [check, setCheck] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const formState = bookableFormState();
  const queryClient = useQueryClient();

  const {
    mutate: createBookable,
    status,
    error,
  } = useMutation((item) => createItem("http://localhost:8080/api/admin/bookables", item), {
    onSuccess: (bookable) => {
      queryClient.setQueryData("bookables", (old) => [...(old || []), bookable]);

      toast.success("Created new bookable successfully!");

      navigate(`/bookables/${bookable.id}`);
    },
  });

  useEffect(() => {
    if (currentUser) {
      currentUser.roles.map((role) => {
        // console.log(role)
        if (role === "ROLE_ADMIN")
          setRoleAdmin(true);
        setCheck(true)
      });
    }
  }, []);

  function handleSubmit() {
    createBookable(formState.state);
  }

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  if (status === "loading") {
    return <PageSpinner />;
  }

  if (!currentUser && !check) {
    return <Navigate to="/error" />;
  }

  if (!currentUser && check) {
    return <Navigate to="/" />;
  }

  if (!roleAdmin && check) {
    return <Navigate to="/error" />;
  }

  return <BookableForm formState={formState} handleSubmit={handleSubmit} roleAdmin={roleAdmin} />;
}

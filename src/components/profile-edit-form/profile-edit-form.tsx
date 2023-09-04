import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { updateUser } from "../../services/actions/auth";
import { TUser } from "../../services/types";

const ProfileEditForm: React.FC = () => {
  const dispatch = useDispatch();
  const [form, setFormValue] = useState({ name: "", email: "", password: "" });
  const [nameEditActive, setNameEditActive] = useState(false);
  const [emailEditActive, setEmailEditActive] = useState(false);
  const [passwordEditActive, setPasswordEditActive] = useState(false);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    resetForm(user);
  }, [user]);

  const resetForm = (userdata: TUser) => {
    setFormValue({
      name: userdata.name,
      email: userdata.email,
    });
  };

  const onFormChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValue({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(updateUser(form));
      setNameEditActive(false);
      setEmailEditActive(false);
      setPasswordEditActive(false);
    },
    [dispatch, form]
  );

  const onFormReset = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      resetForm(user);
      setNameEditActive(false);
      setEmailEditActive(false);
      setPasswordEditActive(false);
    },
    [user]
  );

  return (
    <form onSubmit={onFormSubmit} onReset={onFormReset}>
      <label htmlFor="name"></label>
      <Input
        type="text"
        placeholder="Имя"
        value={form.name}
        size="default"
        extraClass="mb-6"
        onChange={onFormChange}
        disabled={!nameEditActive}
        icon="EditIcon"
        onIconClick={() => setNameEditActive(true)}
        name="name"
        id="name"
      />
      <label htmlFor="email"></label>
      <Input
        type="email"
        placeholder="Логин"
        value={form.email}
        size="default"
        extraClass="mb-6"
        onChange={onFormChange}
        disabled={!emailEditActive}
        icon="EditIcon"
        onIconClick={() => setEmailEditActive(true)}
        name="email"
        id="email"
      />
      <label htmlFor="password"></label>
      <Input
        placeholder="Пароль"
        value={passwordEditActive ? form.password || "" : "******"}
        size="default"
        extraClass="mb-6"
        onChange={onFormChange}
        disabled={!passwordEditActive}
        icon="EditIcon"
        onIconClick={() => {
          setPasswordEditActive(true);
          setFormValue({ ...form, password: "" });
        }}
        name="password"
        id="password"
      />
      {(nameEditActive || emailEditActive || passwordEditActive) && (
        <div>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
          <Button
            htmlType="reset"
            type="primary"
            size="medium"
            extraClass="ml-6"
          >
            Отмена
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileEditForm;

"use client";

import { IoIosSend } from "react-icons/io";
import Button from "@/app/components/atoms/Button";
import Input from "../molecules/Input";
import Textarea from "../molecules/Textarea";
import { useState } from "react";
import { sendEmail } from "@/services/sendEmail";
import { Toast } from "./Toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { DictionaryKey } from "@/i18n/dictionary";

const MESSAGE_MAX_LENGTH = 300;

type Translate = (key: DictionaryKey) => string;

function validateName(name: string, t: Translate) {
  return name.trim().length < 3 ? t("form.error.name") : "";
}

function validateEmail(email: string, t: Translate) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !regex.test(email) ? t("form.error.email") : "";
}

function validateMessage(message: string, t: Translate) {
  return message.trim().length < 4
    ? t("form.error.messageShort")
    : message.trim().length > MESSAGE_MAX_LENGTH
      ? t("form.error.messageLong")
      : "";
}

export default function Form() {
  const { t } = useLanguage();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const inputName = {
    id: "form-name",
    label: t("form.name"),
    placeholder: t("form.name.placeholder"),
    required: true,
    autoComplete: "name",
    value: name,
    error: errors.name,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setName(value);
      setErrors((prev) => ({
        ...prev,
        name: validateName(value, t),
      }));
    },
    onBlur: () =>
      setErrors((prev) => ({ ...prev, name: validateName(name, t) })),
  };

  const inputEmail = {
    id: "form-email",
    label: t("form.email"),
    placeholder: t("form.email.placeholder"),
    required: true,
    type: "email" as const,
    autoComplete: "email",
    value: email,
    error: errors.email,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value, t),
      }));
    },
    onBlur: () =>
      setErrors((prev) => ({ ...prev, email: validateEmail(email, t) })),
  };

  const inputMessage = {
    id: "form-message",
    label: t("form.message"),
    placeholder: t("form.message.placeholder"),
    required: true,
    value: message,
    error: errors.message,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setMessage(value);
      setErrors((prev) => ({
        ...prev,
        message: validateMessage(value, t),
      }));
    },
    onBlur: () =>
      setErrors((prev) => ({ ...prev, message: validateMessage(message, t) })),
    counter: (
      <span
        className={`text-sm ${
          message.length > MESSAGE_MAX_LENGTH ? "text-red-400" : "text-gray-200"
        }`}
      >
        {message.length} / {MESSAGE_MAX_LENGTH}
      </span>
    ),
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const nameError = validateName(name, t);
    const emailError = validateEmail(email, t);
    const messageError = validateMessage(message, t);

    setErrors({
      name: nameError,
      email: emailError,
      message: messageError,
    });

    if (nameError || emailError || messageError) return;

    setLoading(true);
    try {
      const mailPayload = {
        name,
        message,
        type: "portfolio_job_offer",
        from: email,
        to: "dev.almeida.matheus@gmail.com",
      };

      const result = await sendEmail(mailPayload);

      if (result.success) {
        Toast.success(t("form.success"));

        setName("");
        setEmail("");
        setMessage("");
      } else {
        Toast.error(t("form.fail"));
      }
    } catch (error) {
      Toast.error(
        error instanceof Error
          ? error.message
          : t("form.unexpected"),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full max-w-2xl mx-auto p-5 sm:p-6 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
    >
      <Input {...inputName} />
      <Input {...inputEmail} />
      <Textarea {...inputMessage} />

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          className="sm:w-42"
          disabled={loading}
          isLoading={loading}
        >
          <div className="flex gap-2 items-center justify-center">
            {t("form.send")} <IoIosSend size={24} />
          </div>
        </Button>
      </div>
    </form>
  );
}

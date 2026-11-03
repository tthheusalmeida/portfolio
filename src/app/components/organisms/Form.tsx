"use client";

import { IoIosSend } from "react-icons/io";
import Button from "@/app/components/atoms/Button";
import Input from "../molecules/Input";
import Textarea from "../molecules/Textarea";
import { useState } from "react";
import { sendEmail } from "@/services/sendEmail";
import { Toast } from "./Toast";
import AnimatedComponent from "../molecules/AnimatedComponent";
import { useLanguage } from "@/contexts/LanguageContext";
import { DictionaryKey } from "@/i18n/dictionary";

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
    : message.trim().length > 300
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
    value: name,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setName(value);
      setErrors((prev) => ({
        ...prev,
        name: validateName(value, t),
      }));
    },
  };

  const inputEmail = {
    id: "form-email",
    label: t("form.email"),
    placeholder: t("form.email.placeholder"),
    required: true,
    value: email,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value, t),
      }));
    },
  };

  const inputMessage = {
    id: "form-message",
    label: t("form.message"),
    placeholder: t("form.message.placeholder"),
    required: true,
    value: message,
    maxLength: 300,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setMessage(value);
      setErrors((prev) => ({
        ...prev,
        message: validateMessage(value, t),
      }));
    },
  };

  async function handleOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

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
    <form className="w-full max-w-2xl mx-auto space-y-6">
      <div>
        <Input {...inputName} />
        <p
          className={`text-red-400 text-sm mt-1 transition-opacity duration-200 min-h-5 ${
            errors.name ? "opacity-100" : "opacity-0"
          }`}
        >
          {errors.name || ""}
        </p>
      </div>

      <div>
        <Input {...inputEmail} />
        <p
          className={`text-red-400 text-sm mt-1 transition-opacity duration-200 min-h-5 ${
            errors.email ? "opacity-100" : "opacity-0"
          }`}
        >
          {errors.email || ""}
        </p>
      </div>

      <div className="relative">
        <div className="absolute flex justify-end items-center mb-2 right-0">
          <AnimatedComponent
            HTMLtag="span"
            className={`text-sm ${
              message.length > inputMessage.maxLength
                ? "text-red-400"
                : "text-gray-200"
            }`}
          >
            {message.length} / {inputMessage.maxLength}
          </AnimatedComponent>
        </div>

        <Textarea {...inputMessage} />

        <p
          className={`text-red-400 text-sm mt-1 transition-opacity duration-200 min-h-5 ${
            errors.message ? "opacity-100" : "opacity-0"
          }`}
        >
          {errors.message || ""}
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          className="sm:w-42"
          onClick={(event) => handleOnClick(event)}
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

"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../primitives/input";
import { Label } from "../primitives/label";
import { Button } from "../primitives/button";
import { useFormStore } from "@/lib/store/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Validation = 'email' | (
    | "password"
    | "confirmPassword"
  )[] | undefined

const shouldValidate = (step: number): Validation => {
  switch (step) {
    case 0:
      return "email";
    case 1:
      return ["password", "confirmPassword"];
    default:
      return undefined;
  }
};

const formSchema = z
  .object({
    email: z.string().email("invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormSchema = z.infer<typeof formSchema>;

export function Form() {
  const store = useFormStore();
  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (store.values) {
      for (const value in store.values) {
        // @ts-ignore
        methods.setValue(value, store.values[value]);
      }
    }
  }, [store.values, methods]);

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const onNext = () => {
    methods
      .trigger(shouldValidate(store.step), { shouldFocus: true })
      .then((isValid) => {
        if (isValid) {
          store.increaseStep();
          const values = methods.getValues();
          store.setValues(values);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <section className="w-1/2 rounded bg-slate-100 p-4">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Form
      </h1>
      Step: {store.step}
      <form className="my-4 h-1/2" onSubmit={methods.handleSubmit(onSubmit)}>
        {store.step === 0 ? (
          <Label htmlFor="email">
            Email
            <Input
              placeholder="Email"
              className="mt-2"
              {...methods.register("email")}
            />
            {methods.formState.errors.email && (
              <span className="mt-2 block text-red-800">
                {methods.formState.errors.email?.message}
              </span>
            )}
          </Label>
        ) : null}
        {store.step === 1 ? (
          <>
            <Label htmlFor="password">
              Password
              <Input
                placeholder="Password"
                className="mt-2"
                type="password"
                {...methods.register("password")}
              />
              {methods.formState.errors.password && (
                <span className="mt-2 block text-red-800">
                  {methods.formState.errors.password?.message}
                </span>
              )}
            </Label>
            <Label htmlFor="confirmPassword">
              Confirm Password
              <Input
                placeholder="Confirm Password"
                className="mt-2"
                type="password"
                {...methods.register("confirmPassword")}
              />
              {methods.formState.errors.confirmPassword && (
                <span className="mt-2 block text-red-800">
                  {methods.formState.errors.confirmPassword?.message}
                </span>
              )}
            </Label>
          </>
        ) : null}
      </form>
      <div className="flex justify-between">
        <Button
          disabled={store.step === 0}
          onClick={() => store.decreaseStep()}
        >
          Prev
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </section>
  );
}

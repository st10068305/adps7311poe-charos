import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/authentication/register")({
  component: Register,
  validateSearch: z.object({ to: z.string() }),
});

const registerSchema = z.object({
  username: z
    .string()
    .regex(
      /^[a-z0-9]+$/g,
      "Please ensure that your username only contains lowercase letters or numbers."
    ),
  password: z
    .string()
    .min(8, "Please enter a password with at least 8 characters.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=(?:.*[\W_]){2,}).{8,}$/g,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and two special characters."
    ),
  fullName: z
    .string()
    .regex(
      /^[A-Z][a-zA-Z]*\s[a-zA-Z]+$/g,
      "Please ensure that you have entered a valid full name, e.g. John Doe"
    ),
  idNumber: z
    .string()
    .min(13, "Please enter an account number with at least 13 digits.")
    .max(13, "Please enter an account number with at most 13 digits.")
    .regex(
      /^\d+$/g,
      "Please ensure that you have entered a valid ID Number, e.g. 2348930424356"
    ),
  accountNumber: z
    .string()
    .min(10, "Please enter an account number with at least 10 digits.")
    .max(10, "Please enter an account number with at most 10 digits.")
    .regex(
      /^\d+$/g,
      "Please ensure that you have entered a valid ID Number, e.g. 2348930424"
    ),
});

function Register() {
  const navigate = useNavigate();
  const { to } = useSearch({ from: "/authentication/register" });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      fullName: "",
      idNumber: "",
      accountNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const headers = new Headers();

    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Credentials", "true");

    const registerResponse = await fetch("/api/authentication/register", {
      method: "POST",
      body: JSON.stringify(values),
      headers,
    });

    const registerStatus = registerResponse.status;

    if (registerStatus === 200) {
      toast.success("Success", {
        description: "You have successfully registered.",
        duration: 2000,
      });

      return navigate({ to: "/authentication/login", search: { to } });
    } else {
      try {
        const responseText = await registerResponse.text();
        const responseJSON = JSON.parse(responseText);

        return toast.error(registerResponse.statusText, {
          description: responseJSON.message,
          duration: 2000,
        });
      } catch (error) {
        const responseText = await registerResponse.text();

        return toast.error("Unknown Error", {
          description: responseText,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col w-full p-5 space-y-5 lg:max-w-lg">
        <div className="flex flex-col items-center justify-center w-full space-y-3">
          <Label className="text-2xl text-primary">Register</Label>
          <Label className="text-muted-foreground">
            Please enter your details below to register.
          </Label>
        </div>

        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onSubmit)}
            className="flex flex-col w-full h-auto space-y-3"
          >
            <FormField
              control={registerForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormDescription>This is your username.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Secure Password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>This is your full name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Number</FormLabel>
                  <FormControl>
                    <Input placeholder="2348930424356" {...field} />
                  </FormControl>
                  <FormDescription>This is your ID number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input placeholder="2348930424" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your account number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Continue</Button>
          </form>
        </Form>

        <div className="flex flex-col w-full h-auto space-y-3">
          <div className="flex items-center space-x-3">
            <Label>Already have a registered account?</Label>

            <Link to="/authentication/login" search={{ to }}>
              <Label className="underline cursor-pointer text-primary">
                Login
              </Label>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

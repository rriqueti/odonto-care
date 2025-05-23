'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import { useAuth } from "@/app/context/AuthContext";
import { AuthService } from "@/app/login/authService";

export function LoginForm({
  className,
  ...props
}) {

  const { login } = useAuth();

  const email = useRef(null);
  const password = useRef(null);

  async function handleSubmit() {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    console.log(emailValue, passwordValue);
    

    const loginResponse = await AuthService(emailValue, passwordValue);

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Acesse sua conta</CardTitle>
          <CardDescription>
            Digite seu e-mail e senha para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form> */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" ref={email} type="email" placeholder="exemplo@email.com" required />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Esqueceu sua senha?
                </a>
              </div>
              <Input id="password" ref={password} type="password" required />
            </div>
            <div className="flex flex-col gap-3">
              <Button onClick={handleSubmit} className="w-full">
                Entrar
              </Button>
              {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Não possui uma conta ?{" "}
            <a href="#" className="underline underline-offset-4">
              Criar conta
            </a>
          </div>
          {/* </form> */}
        </CardContent>
      </Card>
    </div>
  );
}

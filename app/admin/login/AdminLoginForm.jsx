"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminLoginForm() {
 const router = useRouter();
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);

 async function handleSubmit(event) {
  event.preventDefault();
  setLoading(true);
  setError("");

  const res = await fetch("/api/admin/login", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
   setError("Geçersiz kullanıcı adı veya şifre");
   setLoading(false);
   return;
  }

  router.push("/admin");
  router.refresh();
 }

 return (
  <Card className="w-full max-w-md">
   <CardContent className="p-8">
    <div className="mb-6 text-center">
     <h1 className="font-serif text-3xl text-heading">Admin Girişi</h1>
     <p className="text-sm text-body mt-2">Site içeriğini yönetmek için giriş yapın.</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
     <div className="space-y-2">
      <Label htmlFor="username">Kullanıcı adı</Label>
      <Input
       id="username"
       type="text"
       placeholder="Kullanıcı adınız"
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       autoComplete="username"
       required
      />
     </div>
     <div className="space-y-2">
      <Label htmlFor="password">Şifre</Label>
      <Input
       id="password"
       type="password"
       placeholder="Şifreniz"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       autoComplete="current-password"
       required
      />
     </div>
     {error ? <p className="text-sm text-red-500">{error}</p> : null}
     <Button type="submit" className="w-full" disabled={loading}>
      {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
     </Button>
    </form>
   </CardContent>
  </Card>
 );
}
